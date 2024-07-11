using Contracts.Items;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Auctions
{
    public class AuctionUpdated
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Seller { get; set; }
        public DateTime AuctionStart { get; set; }
        public DateTime AuctionEnd { get; set; }
        public string Status { get; set; }
        public List<ItemUpdated> Items { get; set; } = new List<ItemUpdated>();
    }
}
