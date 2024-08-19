using MongoDB.Entities;

namespace BiddingService.Models
{
    public class Item : Entity
    {
        public int ReservePrice { get; set; }  // Minimum acceptable price for the item
        public int? SoldAmount { get; set; }  // Final amount for which the item was sold (null if not sold)
        public Guid AuctionId { get; set; }  // Reference to the associated auction

        public string Winner { get; set; }  // Identifier of the winning bidder (null if not sold)
        public int? CurrentHighBid { get; set; }  // Current highest bid (null if not sold)
        public bool Sold { get; set; }
    }
}
