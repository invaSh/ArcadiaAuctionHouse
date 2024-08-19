using AutoMapper;
using BiddingService.DTOs;
using BiddingService.Models;
using Contracts.Items;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;

namespace BiddingService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IPublishEndpoint _publishEndpoint;

        public BidsController(IMapper mapper, IPublishEndpoint publish)
        {
            _mapper = mapper;
            _publishEndpoint = publish;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<BidDto>> PlaceBid([FromQuery]Guid itemId, [FromQuery]int amount)
        {
            var item = await DB.Find<Item>().OneAsync(itemId);
            var user = User.Identity.Name;

            if (item == null)
            {
                //check with auction service

                return NotFound();
            }

            var auction = await DB.Find<Auction>().OneAsync(item.AuctionId);

            if (auction.Seller == user)
            {
                return BadRequest("You cannot bid on your own auction!");
            }

            var bid = new Bid
            {
                Amount = amount,
                ItemId = itemId,
                Bidder = user
            };

            if (auction.AuctionEnd < DateTime.UtcNow)
            {
                bid.BidStatus = BidStatus.NoLongerInAuction;
            }
            else
            {
                var highBid = await DB.Find<Bid>()
                               .Match(i => i.ItemId == itemId)
                               .Sort(b => b.Descending(x => x.Amount))
                               .ExecuteFirstAsync();

                if (highBid != null && amount > highBid.Amount || highBid == null)
                {
                    bid.BidStatus = amount > item.ReservePrice
                        ? BidStatus.Accepted
                        : BidStatus.AcceptedBelowReserve;
                }

                if (highBid != null && bid.Amount <= highBid.Amount)
                {
                    bid.BidStatus = BidStatus.TooLow;
                }
            }

            await DB.SaveAsync(bid);
            await _publishEndpoint.Publish(_mapper.Map<BidPlaced>(bid));
            return Ok(_mapper.Map<BidDto>(bid));

        }

        [HttpGet("{itemId}")]
        public async Task<ActionResult<List<BidDto>>> GetBidsForItem(Guid itemId)
        {
            var bids = await DB.Find<Bid>()
                 .Match(i => i.ItemId == itemId)
                 .Sort(b => b.Descending(b => b.BidTime))
                 .ExecuteAsync();

            return bids.Select(_mapper.Map<BidDto>).ToList();
        }
    }
}
                                                        