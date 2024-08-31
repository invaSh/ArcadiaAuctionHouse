namespace BiddingService.DTOs
{
    public class PlaceBidRequest
    {
        public Guid ItemId { get; set; }
        public int Amount { get; set; }
    }
}
