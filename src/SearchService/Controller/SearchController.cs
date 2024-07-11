using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;
using SearchService.Models;
using System.Security;

namespace SearchService.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        [HttpGet("SearchItems")]
        public async Task<ActionResult<Item>> SearchItems(string searchTerm)
        {
            var itemQuery = DB.Find<Item>();
            var auctionQuery = DB.Find<Auction>();

            if (!string.IsNullOrEmpty(searchTerm))
            {
                var keywords = searchTerm.Split(' ');

                itemQuery.Match(item =>
                    keywords.Any(kw => item.Title.Contains(kw, StringComparison.OrdinalIgnoreCase)) ||
                    keywords.Any(kw => item.ArtistOrMaker.Contains(kw, StringComparison.OrdinalIgnoreCase)) ||
                    keywords.Any(kw => item.Description.Contains(kw, StringComparison.OrdinalIgnoreCase))
                );

                auctionQuery.Match(auction =>
                    keywords.Any(kw => auction.Title.Contains(kw, StringComparison.OrdinalIgnoreCase)) ||
                    keywords.Any(kw => auction.Seller.Contains(kw, StringComparison.OrdinalIgnoreCase)) 
                );
            }

            itemQuery.Sort(x => x.Ascending(a => a.ArtistOrMaker));
            auctionQuery.Sort(x => x.Ascending(a => a.Title));

            var itemsResult = await itemQuery.ExecuteAsync();
            var auctionsResult = await auctionQuery.ExecuteAsync();

            return Ok(new
            {
                ItemCount = itemsResult.Count,
                AuctionCount = auctionsResult.Count,
                Items = itemsResult,
                Auctions = auctionsResult
            });
        }
    }
}
