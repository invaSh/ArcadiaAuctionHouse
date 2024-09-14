using MongoDB.Entities;

namespace BiddingService.Models
{
    public class Auction : Entity
    {
        public string Title { get; set; }
        public string Seller { get; set; }
        public DateTime AuctionEnd { get; set; } 
        public string Status { get; set; }  
        public bool Finished { get; set; } 
        public List<Item> Items { get; set; } = new List<Item>();
    }
}
