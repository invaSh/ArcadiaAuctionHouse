using AuctionService.DTOs.Item;
using AuctionService.Models;

namespace AuctionService.DTOs.Auction
{
    public class CreateAuctionDto
    {
        public Guid Id { get; set; }
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

        public int TotalRevenue { get; set; }
        public ICollection<CreateItemDto> Items { get; set; } = new List<CreateItemDto>();
    }
}
