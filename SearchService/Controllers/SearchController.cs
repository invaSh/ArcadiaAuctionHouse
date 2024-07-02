using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<Item>>> SearchItems(string searchTerm, int pageNum = 1, int pageSize = 4)
        {
            var query = DB.PagedSearch<Item>(); 

            query.Sort(x => x.Ascending(a => a.ArtistOrMaker));

            if (!string.IsNullOrEmpty(searchTerm))
            {
                var regexPattern = new BsonRegularExpression($".*{searchTerm}.*", "i");
                query.Match(f => f.Regex(item => item.ArtistOrMaker, regexPattern));
            }

            query.PageNumber(pageNum);
            query.PageSize(pageSize);


            var result = await query.ExecuteAsync(); 
            return Ok(new 
                {
                    results = result.Results,
                    pageCount = result.PageCount,
                    totalCount = result.TotalCount 
                }); 
        }
    }

}
