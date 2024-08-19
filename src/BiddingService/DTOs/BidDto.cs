using BiddingService.Models;

namespace BiddingService.DTOs
{
    public class BidDto
    {
        public string Id { get; set; }
        public Guid ItemId { get; set; }
        public string Bidder { get; set; }
        public DateTime BidTime { get; set; }
        public int Amount { get; set; }
        public string BidStatus { get; set; }
    }
}
