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
                var lowerCaseSearchTerm = searchTerm.ToLower();

                var itemsResult = await itemQuery.Match(i =>
                               i.ArtistOrMaker.ToLower().Contains(lowerCaseSearchTerm) ||
                               i.Title.ToLower().Contains(lowerCaseSearchTerm) ||
                               i.Description.ToLower().Contains(lowerCaseSearchTerm))
                .ExecuteAsync();

                var auctionsResult = await auctionQuery.Match(a =>
                                  a.Seller.ToLower().Contains(lowerCaseSearchTerm) ||
                                  a.Title.ToLower().Contains(lowerCaseSearchTerm))
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

        [HttpGet("{auctionId}/filter")]
        public async Task<ActionResult> FilterItems(Guid auctionId, bool title = false, bool artistOrMaker = false, bool yearOfCreation = false)
        {
            
            var query =  DB.Find<Item>()
                .Match(i => i.AuctionId == auctionId);

            var itemsList = await query.ExecuteAsync();


            if (title)
            {
                itemsList = itemsList.OrderBy(i => i.Title).ToList();
            }
            if (artistOrMaker)
            {
                itemsList = itemsList.OrderBy(i => i.ArtistOrMaker).ToList();
            }
            if (yearOfCreation)
            {
                itemsList = itemsList.OrderBy(i => i.YearOfCreation).ToList();
            }

            return Ok(new
            {     
                Items = itemsList
            });
        }


    }
}
