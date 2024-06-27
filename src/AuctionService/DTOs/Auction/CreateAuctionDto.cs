using AuctionService.DTOs.Item;

namespace AuctionService.DTOs.Auction
{
    public class CreateAuctionDto
    {
        public int ReservePrice { get; set; }
        public string Seller { get; set; }
        public DateTime AuctionEnd { get; set; }
        public string Status { get; set; }
        public List<CreateItemDto> Items { get; set; } = new List<CreateItemDto>();
    }
}
