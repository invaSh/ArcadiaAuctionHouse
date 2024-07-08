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
        public async Task<ActionResult<List<Item>>> SearchItems(string searchTerm)
        {
            var query = DB.Find<Item>();

            if (!string.IsNullOrEmpty(searchTerm))
            {
                query.Match(item => item.Title.Contains(searchTerm) ||
                                            item.ArtistOrMaker.Contains(searchTerm) ||
                                            item.Description.Contains(searchTerm));
            }

            query.Sort(x => x.Ascending(a => a.ArtistOrMaker));

            var result = await query.ExecuteAsync();

            return result;
        }
    }
}
