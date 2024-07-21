using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Items
{
    public class ItemSold
    {
        public string Id { get; set; }
        public int? Amount { get; set; }
        public string Seller { get; set; }
        public string Winner { get; set; }
        public bool ItemSell { get; set; }
        public string AuctionId { get; set; }
    }
}
