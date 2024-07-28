using AuctionService.Data;
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
                .Include(x=> x.Items)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (auction == null) return NotFound();

            return _mapper.Map<AuctionDto>(auction);  

        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<AuctionDto>> CreateAuction(CreateAuctionDto auctionDto)
        {
            var auction = _mapper.Map<Auction>(auctionDto);
            auction.Seller = User.Identity.Name;
            auctionDto.Seller = User.Identity.Name;

            _context.Auctions.Add(auction);

            await _publishEndpoint.Publish(_mapper.Map<AuctionCreated>(auctionDto));

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest("Could not save changes");

            return Ok("Auction Created");
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAuction(Guid id, UpdateAuctionDto auctionDto)
        {
            var auction = await _context.Auctions
                .Include(x => x.Items)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (auction == null) return NotFound();
            if(auction.Seller != User.Identity.Name) return Forbid();

            auction.Title = auctionDto.Title;
            auction.AuctionStart = auctionDto.AuctionStart;
            auction.AuctionEnd = auctionDto.AuctionEnd;
            auction.UpdatedAt = DateTime.UtcNow;

            Console.WriteLine("-------------------------------------->Updating auction with ID: " + auction.Id);

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

    }
}
