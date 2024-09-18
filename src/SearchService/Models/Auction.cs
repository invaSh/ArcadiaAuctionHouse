using MongoDB.Entities;

namespace SearchService.Models
{
    public class Auction : Entity
    {
        public Guid GuidId
        {
            get => Guid.Parse(ID);
            set => ID = value.ToString();
        }
        public string Title { get; set; }
        public string Seller { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public DateTime AuctionStart { get; set; }
        public DateTime AuctionEnd { get; set; }
        public string Status { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public string ShortDesc { get; set; }

        public ICollection<Item> Items { get; set; } = new List<Item>();
    }
}
