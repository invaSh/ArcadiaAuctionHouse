using Contracts.Items;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Auctions
{
    public class AuctionFinished
    {
        public Guid AuctionId { get; set; }  
        public string Title { get; set; }   
        public DateTime EndedAt { get; set; } 
        public bool IsTimeElapsed { get; set; } 
        public bool IsAllItemsSold { get; set; }
        public List<ItemSold> ItemsSold { get; set; } 
        public int TotalRevenue { get; set; } 
        public string EndingReason => IsTimeElapsed ? "Time Elapsed" : "All Items Sold"; 
    }
}
