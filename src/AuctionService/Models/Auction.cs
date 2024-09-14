﻿namespace AuctionService.Models
{
    public class Auction
    {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Seller { get; set; }
            public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
            public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
            public DateTime AuctionStart { get; set; }
            public DateTime AuctionEnd { get; set; }
            public Status Status { get; set; }
            public string ImageUrl { get; set; }
            public int TotalRevenue { get; set; }
            public string BannerUrl { get; set; }
            public string Description { get; set; }
            public ICollection<Item> Items { get; set; } = new List<Item>();
    }
}
