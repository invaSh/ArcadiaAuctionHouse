using Microsoft.EntityFrameworkCore;
using StoryService.Models;

namespace StoryService.Data
{
    public class StoryDbContext  : DbContext
    {
        public StoryDbContext(DbContextOptions options) : base(options)
        { 
        }

        public DbSet<Story> Stories { get; set; }


    }
}
