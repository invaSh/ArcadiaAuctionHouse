namespace AuctionService.Models
{
    public class Auction
    {
        public Guid Id { get; set; }

        public int ReservePrice { get; set; } = 0;

        public string Seller { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public DateTime AuctionEnd { get; set; }

        public Status Status { get; set; }

        // Navigation property for the related items
        public ICollection<Item> Items { get; set; } = new List<Item>();
    }
}
