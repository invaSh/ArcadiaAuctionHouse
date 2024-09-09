
using AuctionService.Models;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Data
{
    public class DbInitializer
    {
        public static void InitDb(WebApplication app)
        {
            using var scope = app.Services.CreateScope();

            SeedData(scope.ServiceProvider.GetService<AuctionDbContext>());
        }

        private static void SeedData(AuctionDbContext context)
        {
            context.Database.Migrate();

            if (context.AuctionBanners.Any())
            {
                Console.WriteLine("Already have data");
                return;
            }

            var banners = new List<AuctionBanner>
            {                    
                new AuctionBanner
                {
                    Id = 1,
                    AuctionId = null,
                } ,
                new AuctionBanner
                {
                    Id = 2,
                    AuctionId = null,
                } ,
                new AuctionBanner
                {
                    Id = 3,
                    AuctionId = null,
                } ,
            };


            context.AddRange(banners);

            context.SaveChanges();
        }

    }
}
