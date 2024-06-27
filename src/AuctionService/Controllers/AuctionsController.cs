using AuctionService.Data;
using AuctionService.DTOs.Auction;
using AuctionService.Models;
using AutoMapper;
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

        public AuctionsController(AuctionDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<AuctionDto>>> GetAllAuctions()
        {
            var auctions = await _context.Auctions
                .Include(x => x.Items)
                .ToListAsync();
            return _mapper.Map<List<AuctionDto>>(auctions);
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

        [HttpPost]
        public async Task<ActionResult<AuctionDto>> CreateAuction(CreateAuctionDto auctionDto)
        {
            var auction = _mapper.Map<Auction>(auctionDto);

            auction.Seller = "test";

            _context.Auctions.Add(auction);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest("Could not save changes");

            return CreatedAtAction(nameof(GetAuction), new { auction.Id }, _mapper.Map<AuctionDto>(auction));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAuction(Guid id, UpdateAuctionDto auctionDto)
        {
            var auction = await _context.Auctions
                .Include(x => x.Items)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (auction == null) return NotFound();

            auction.Title = auctionDto.Title;
            auction.Seller = auctionDto.Seller;
            auction.AuctionStart = auctionDto.AuctionStart;
            auction.AuctionEnd = auctionDto.AuctionEnd;
            auction.UpdatedAt = DateTime.UtcNow;

            var res = await _context.SaveChangesAsync();

            if (res == 0) return BadRequest("Update not finished.");

            return Ok("Auction successfully updated");
        }

        //[HttpDelete("{id}")]
        //public async Task<ActionResult> DeleteAuction(Guid id)
        //{

        //}
    }
}
