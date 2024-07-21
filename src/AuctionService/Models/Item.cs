namespace AuctionService.Models
{
    public class Item
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Dimensions { get; set; } // e.g., "Height x Width x Depth"
        public string Materials { get; set; } // e.g., "Oil on canvas"
        public string ConditionReport { get; set; }
        public string ArtistOrMaker { get; set; }
        public int YearOfCreation { get; set; }
        public string ImageUrl { get; set; }
        public string Provenance { get; set; }
        public int? ReservePrice { get; set; }

        // Bidding related properties
        public string Winner { get; set; }
        public int? SoldAmount { get; set; }
        public int? CurrentHighBid { get; set; }
        public bool Sold { get; set; }

        // Foreign key to the Auction
        public Guid? AuctionId { get; set; }
        public Auction? Auction { get; set; }
    }
}
