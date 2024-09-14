using AutoMapper;
using BiddingService.DTOs;
using BiddingService.Models;
using Contracts.Items;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
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
        public async Task<ActionResult<BidDto>> PlaceBid([FromBody] PlaceBidRequest request)
        {
            var item = await DB.Find<Item>().OneAsync(request.ItemId);
            var user = User.Identity.Name;

            if (item == null)
            {
                return NotFound();
            }

            var auction = await DB.Find<Auction>().OneAsync(item.AuctionId);

            if (auction.Seller == user)
            {
                return BadRequest("You cannot bid on your own auction!");
            }

            var bid = new Bid
            {
                Amount = request.Amount,
                ItemId = request.ItemId,
                Bidder = user
            };

            if (auction.AuctionEnd < DateTime.UtcNow)
            {
                bid.BidStatus = BidStatus.NoLongerInAuction;
            }
            else
            {
                var highBid = await DB.Find<Bid>()
                               .Match(i => i.ItemId == request.ItemId)
                               .Sort(b => b.Descending(x => x.Amount))
                               .ExecuteFirstAsync();

                if (highBid != null && request.Amount > highBid.Amount || highBid == null)
                {
                    bid.BidStatus = request.Amount > item.ReservePrice
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

        [HttpGet]
        public async Task<ActionResult<List<BidDto>>> GetAllBids()
        {
            var bids = await DB.Find<Bid>()
                 .Sort(b => b.Descending(b => b.BidTime))
                 .ExecuteAsync();

            var bidDtos = bids.Select(bid => _mapper.Map<BidDto>(bid)).ToList();
            return Ok(bidDtos); 
        }



        [Authorize]
        [HttpGet("highest/{itemId}")]
        public async Task<ActionResult<BidDto>> GetHighestBidForUserForItem(Guid itemId)
        {
            var user = User.Identity.Name;

            var highestBid = await DB.Find<Bid>()
                .Match(b => b.Bidder == user && b.ItemId == itemId)
                .Sort(b => b.Descending(x => x.Amount))
                .ExecuteFirstAsync();

            if (highestBid == null)
            {
                return NotFound("You haven't placed any bids yet.");
            }

            return Ok(_mapper.Map<BidDto>(highestBid));
        }

        [HttpGet("weekly")]
        public async Task<ActionResult> GetWeeklyBidActivity()
        {
            var endDate = DateTime.UtcNow;
            var startDate = endDate.AddDays(-7);

            var bids = await DB.Find<Bid>()
                .Match(b => b.BidTime >= startDate && b.BidTime <= endDate)
                .ExecuteAsync();

            var bidCountsPerDay = new Dictionary<string, int>();

            foreach (var bid in bids)
            {
                var dayKey = bid.BidTime.ToString("yyyy-MM-dd");
                if (bidCountsPerDay.ContainsKey(dayKey))
                {
                    bidCountsPerDay[dayKey]++;
                }
                else
                {
                    bidCountsPerDay[dayKey] = 1;
                }
            }

            var result = bidCountsPerDay.Select(kvp => new
            {
                Date = kvp.Key,
                Count = kvp.Value
            }).OrderBy(x => x.Date).ToList();

            return Ok(result);
        }



    }
}
                                                        