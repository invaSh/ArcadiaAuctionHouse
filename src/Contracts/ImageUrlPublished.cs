using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public class ImageUrlPublished
    {
        public Guid AuctionId { get; set; }
        public string ImageUrl { get; set; }
        public string ImageType { get; set; }
    }
}
