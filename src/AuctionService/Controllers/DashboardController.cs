using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.DTOs.Auction;
using AuctionService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly AuctionDbContext _context;
        public DashboardController(AuctionDbContext context)
        {
            _context = context; 
        }

        [HttpPost("viewcount/{id}")]
        public async Task<ActionResult<int>> IncrementClick(Guid id)
        {
            var item = await _context.Items.FirstOrDefaultAsync(x => x.Id == id);

            if (item == null) { return NotFound("Item not found"); }

            item.Views += 1;

            await _context.SaveChangesAsync();

            return Ok(item.Views);
        }

        [HttpGet("clicks")]
        public async Task<ActionResult<int>> GetAllIncrements()
        {
            var items = await _context.Items.ToListAsync();

            if (items.Count < 0) { return NotFound("No items found"); }

            int? count = 0;
            foreach (var item in items) 
            {
                count += item.Views;
            }

            return Ok(count);
        }

        [HttpGet("revenue")]
        public async Task<ActionResult<Dictionary<string, int>>> GetRevenueForLastSevenWeeks()
        {
            var endDate = DateTime.UtcNow;
            var startDate = endDate.AddDays(-49); // 7 weeks ago

            // Get auctions that ended in the last 7 weeks
            var auctions = await _context.Auctions
                .Where(a => a.Status == Status.Finished && a.AuctionEnd >= startDate && a.AuctionEnd <= endDate)
                .ToListAsync();

            // Dictionary to store week start date as key and total revenue as value
            var weeklyRevenues = new Dictionary<string, int>();

            // Iterate through auctions and group by week start date (e.g., Monday)
            foreach (var auction in auctions)
            {
                // Get the start of the week (Monday) for the auction end date
                var weekStart = auction.AuctionEnd.Date.AddDays(-(int)auction.AuctionEnd.DayOfWeek + (int)DayOfWeek.Monday);

                // Use the week start date as the key in the dictionary
                var weekKey = weekStart.ToString("yyyy-MM-dd");

                // Add or update the total revenue for the week
                if (weeklyRevenues.ContainsKey(weekKey))
                {
                    weeklyRevenues[weekKey] += auction.TotalRevenue;
                }
                else
                {
                    weeklyRevenues[weekKey] = auction.TotalRevenue;
                }
            }

            // Return the last 7 weeks, ordered by week start date
            var orderedRevenues = weeklyRevenues
                .OrderByDescending(kvp => DateTime.Parse(kvp.Key))
                .Take(7) // Limit to the last 7 weeks
                .ToDictionary(kvp => kvp.Key, kvp => kvp.Value);

            return Ok(orderedRevenues);
        }
    }
}
