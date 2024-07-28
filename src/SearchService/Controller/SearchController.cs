using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MongoDB.Entities;
using SearchService.Models;
using System.Security;

namespace SearchService.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> SearchItems(string searchTerm)
        {
            var itemQuery = DB.Find<Item>();
            var auctionQuery = DB.Find<Auction>();

            if (!string.IsNullOrEmpty(searchTerm))
            {
                var keywords = searchTerm.Split(' ');

                var itemsResult = await itemQuery.Match(i =>
                               i.ArtistOrMaker.Contains(searchTerm) ||
                               i.Title.Contains(searchTerm) ||
                               i.Description.Contains(searchTerm))
                .ExecuteAsync();

                var auctionsResult = await auctionQuery.Match(a =>
                                  a.Seller.Contains(searchTerm) ||
                                  a.Title.Contains(searchTerm))
                .ExecuteAsync();

                if (auctionsResult.Count == 0) Console.WriteLine("---->auctions is coming back empty");

                return Ok(new
                {
                    ItemCount = itemsResult.Count,
                    AuctionCount = auctionsResult.Count,
                    Items = itemsResult,
                    Auctions = auctionsResult
                });
            }

            var itemResult = await itemQuery.ExecuteAsync();
            var auctionResult = await auctionQuery.ExecuteAsync();

            if (auctionResult.Count == 0) Console.WriteLine("---->auctions is coming back empty");

            return Ok(new
            {
                ItemCount = itemResult.Count,
                AuctionCount = auctionResult.Count,
                Items = itemResult,
                Auctions = auctionResult
            });
        }

    }
}
