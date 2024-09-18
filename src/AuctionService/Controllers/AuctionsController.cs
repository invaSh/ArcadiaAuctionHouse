using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.DTOs.Auction;
using AuctionService.DTOs.Item;
using AuctionService.Models;
using AutoMapper;
using Contracts.Auctions;
using Contracts.Items;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AuctionService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionsController : ControllerBase
    {
        private readonly AuctionDbContext _context;
        private readonly IMapper _mapper;
        private readonly IPublishEndpoint _publishEndpoint;

        public AuctionsController(AuctionDbContext context, IMapper mapper, IPublishEndpoint publishEndpoint)
        {
            _context = context;
            _mapper = mapper;
            _publishEndpoint = publishEndpoint;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllAuctions()
        {
            var auctions = await _context.Auctions
                .Include(x => x.Items)
                .ToListAsync();

            var auctionDtos = _mapper.Map<List<AuctionDto>>(auctions);
            return Ok(new
            {
                Count = auctionDtos.Count,
                Auctions = auctionDtos
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AuctionDto>> GetAuction(Guid id)
        {
            var auction = await _context.Auctions
                .Include(x => x.Items)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (auction == null) return NotFound();

            return _mapper.Map<AuctionDto>(auction);

        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<AuctionDto>> CreateAuction(CreateAuctionDto auctionDto)
        {
            var auction = _mapper.Map<Auction>(auctionDto);
            auction.Description = auctionDto.Description;

            var username = User.FindFirstValue("name");

            if (string.IsNullOrEmpty(username))
            {
                return BadRequest("Username is missing in the token");
            }

            auction.Seller = username;
            auctionDto.Seller = username;

            if (auctionDto.AuctionStart > DateTime.UtcNow)
            {

                auction.Status = Status.HasNotStarted;
            }
            else if (auctionDto.AuctionEnd <= auctionDto.AuctionStart)
            {
                return BadRequest("The auction end time must be later than the start time.");
            }

            _context.Auctions.Add(auction);


            await _publishEndpoint.Publish(_mapper.Map<AuctionCreated>(auction));

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest("Could not save changes");

            return CreatedAtAction(nameof(GetAuction), new { auction.Id }, auction);

        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAuction(Guid id, UpdateAuctionDto auctionDto)
        {
            var auction = await _context.Auctions
                .Include(x => x.Items)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (auction == null) return NotFound();
            if (auction.Seller != User.Identity.Name) return Forbid();
            auction.Seller = User.Identity.Name;
            auction.Title = auctionDto.Title;
            auction.AuctionStart = auctionDto.AuctionStart;
            auction.UpdatedAt = DateTime.UtcNow;
            auction.ImageUrl = auctionDto.ImageUrl;
            auction.Description = auctionDto.Description;
            auction.ShortDesc = auctionDto.ShortDesc;
            auction.TotalRevenue = auctionDto.TotalRevenue;
            auction.AuctionEnd = auctionDto.AuctionEnd;

            if (auction.AuctionEnd < DateTime.UtcNow)
            {
                auction.Status = Status.Finished;
            }
            else if (auction.AuctionStart > DateTime.UtcNow)
            {
                auction.Status = Status.HasNotStarted;
            }
            else if (auction.AuctionStart <= DateTime.UtcNow && auction.AuctionEnd >= DateTime.UtcNow)
            {
                auction.Status = Status.Live;
            }


            await _publishEndpoint.Publish(_mapper.Map<AuctionUpdated>(auctionDto));

            var res = await _context.SaveChangesAsync();

            if (res == 0) return BadRequest("Update not finished.");

            return Ok("Auction successfully updated");
        }


        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAuction(Guid id)
        {
            var auction = await _context.Auctions.Include(a => a.Items).FirstOrDefaultAsync(a => a.Id == id);

            if (auction == null)
            {
                return NotFound(new { Message = "Auction not found." });
            }

            if (auction.Seller != User.Identity.Name) return Forbid();


            foreach (var item in auction.Items)
            {
                item.AuctionId = null;
                item.Auction = null;
            }

            var itemDetachResult = await _context.SaveChangesAsync();

            _context.Auctions.Remove(auction);

            Console.WriteLine($"---------------------------------------------------------------> Publishing deleted item {auction.Id}");

            await _publishEndpoint.Publish<AuctionDeleted>(new ItemDeleted { Id = auction.Id });

            var auctionDeleteResult = await _context.SaveChangesAsync();

            if (auctionDeleteResult == 0)
            {
                return BadRequest(new { Message = "Could not delete the auction." });
            }

            return Ok(new { Message = "Auction successfully deleted." });
        }

        [HttpGet("upcoming")]
        public async Task<ActionResult<List<Auction>>> GetUpcomingAuctions()
        {
            var upcomingAuctions = await _context.Auctions
                .Where(a => a.Status == Status.HasNotStarted && a.AuctionStart > DateTime.UtcNow)
                .ToListAsync();

            if (upcomingAuctions.Count == 0)
            {
                return NotFound("No upcoming auctions found.");
            }


            return Ok(upcomingAuctions);
        }


        [HttpPut("update-banner/{id}")]
        public async Task<ActionResult<AuctionBanner>> UpdateBanner(int id, BannerDTO banner)
        {
            Console.WriteLine($"============================================================================>Received auctionId: {banner.AuctionId}");

            var newBanner = await _context.AuctionBanners.FirstOrDefaultAsync(b => b.Id == id);
            if (newBanner == null)
            {
                return NotFound();
            }

            newBanner.AuctionId = banner.AuctionId;

            await _context.SaveChangesAsync();

            return Ok(newBanner);
        }


        [HttpGet("update-banner")]
        public async Task<ActionResult> GetBanners()
        {
            var banners = await _context.AuctionBanners
                .OrderBy(b => b.Id)
                .ToListAsync();

            return Ok(banners);
        }



    }
}
