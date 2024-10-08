﻿using MongoDB.Entities;
using System.Net.NetworkInformation;

namespace BiddingService.Models
{
    public class Bid : Entity
    {
        public Guid ItemId { get; set; }
        public string Bidder { get; set; }
        public DateTime BidTime { get; set; } = DateTime.UtcNow;
        public int Amount { get; set; }
        public BidStatus BidStatus { get; set; }
    }
}
