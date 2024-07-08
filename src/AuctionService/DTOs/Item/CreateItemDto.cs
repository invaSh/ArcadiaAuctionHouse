namespace AuctionService.DTOs.Item
{
    public class CreateItemDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Dimensions { get; set; }
        public string Materials { get; set; }
        public string ConditionReport { get; set; }
        public string ArtistOrMaker { get; set; }
        public int YearOfCreation { get; set; }
        public string ImageUrl { get; set; }
        public string Provenance { get; set; }
        public int? SoldAmount { get; set; }
        public Guid AuctionId { get; set; }
    }
}
