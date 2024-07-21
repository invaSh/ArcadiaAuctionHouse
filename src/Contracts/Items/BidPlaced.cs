using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Items
{
    public class BidPlaced
    {
        public DateTime BidTime { get; set; }
        public string Id { get; set; }
        public string ItemId { get; set; }
        public string Bidder { get; set; }
        public int Amount { get; set; }
        public string BidStatus { get; set; }
    }
}
