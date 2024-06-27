using AuctionService.DTOs.Item;
using AuctionService.Models;

namespace AuctionService.DTOs.Auction
{
    public class AuctionDto
    {
        public Guid Id { get; set; }
        public int ReservePrice { get; set; }
        public string Seller { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime AuctionEnd { get; set; }
        public string Status { get; set; }
        public List<ItemDto> Items { get; set; } = new List<ItemDto>();
    }
}
