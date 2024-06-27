using AuctionService.DTOs.Item;

namespace AuctionService.DTOs.Auction
{
    public class UpdateAuctionDto
    {
        public int ReservePrice { get; set; }
        public string Seller { get; set; }
        public DateTime AuctionEnd { get; set; }
        public string Status { get; set; }
        public List<UpdateItemDto> Items { get; set; } = new List<UpdateItemDto>();
    }
}
