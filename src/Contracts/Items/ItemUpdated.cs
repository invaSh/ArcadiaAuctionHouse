using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Items
{
    public class ItemUpdated
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Dimensions { get; set; }
        public string Materials { get; set; }
        public string ConditionReport { get; set; }
        public string ArtistOrMaker { get; set; }
        public int YearOfCreation { get; set; }
        public string ImageUrl { get; set; }
        public string Provenance { get; set; }
        public string Winner { get; set; }
        public int? SoldAmount { get; set; }
        public int? CurrentHighBid { get; set; }
        public Guid AuctionId { get; set; }

    }
}
