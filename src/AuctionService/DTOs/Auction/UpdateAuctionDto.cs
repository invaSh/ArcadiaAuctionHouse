using AuctionService.DTOs.Item;

namespace AuctionService.DTOs.Auction
{
    public class UpdateAuctionDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Seller { get; set; }
        public DateTime AuctionStart { get; set; }
        public DateTime AuctionEnd { get; set; }
        public string Status { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public int TotalRevenue { get; set; }
        public string ShortDesc { get; set; }
        public List<UpdateItemDto> Items { get; set; } = new List<UpdateItemDto>();
    }
}
