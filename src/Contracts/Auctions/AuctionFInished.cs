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
        public int TotalRevenue { get; set; }
        public string Status { get; set; }
    }
}
