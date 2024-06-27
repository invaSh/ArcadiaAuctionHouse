
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

            if (context.Auctions.Any())
            {
                Console.WriteLine("Already have data");
                return;
            }

            var auctions = new List<Auction>
{
                // 1 Fine Arts Auction
                new Auction
                {
                    Id = Guid.Parse("afbee524-5972-4075-8800-7d1f9d7b0a0c"),
                    Title = "Fine Arts Auction",
                    Seller = "Gallery Modern",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    AuctionStart = DateTime.UtcNow,
                    AuctionEnd = DateTime.UtcNow.AddDays(10),
                    Status = Status.Live,
                    Items = new List<Item>
                    {
                        new Item
                        {
                            Id = Guid.NewGuid(),
                            Title = "Starry Night",
                            Description = "One of Van Gogh's most famous works, showcasing his unique style.",
                            Dimensions = "73.7 cm × 92.1 cm",
                            Materials = "Oil on canvas",
                            ConditionReport = "Excellent",
                            ArtistOrMaker = "Vincent van Gogh",
                            YearOfCreation = 1889,
                            ImageUrl = "https://cdn.pixabay.com/photo/2012/04/12/20/12/brush-30414_960_720.png",
                            Provenance = "Passed through various notable collections",
                            Winner = null,
                            SoldAmount = null,
                            CurrentHighBid = null
                        },
                        new Item
                        {
                            Id = Guid.NewGuid(),
                            Title = "The Persistence of Memory",
                            Description = "A seminal work of surrealist art by Salvador Dali.",
                            Dimensions = "24 cm x 33 cm",
                            Materials = "Oil on canvas",
                            ConditionReport = "Good, slight fading",
                            ArtistOrMaker = "Salvador Dali",
                            YearOfCreation = 1931,
                            ImageUrl = "https://cdn.pixabay.com/photo/2016/04/30/22/04/dali-1366974_960_720.jpg",
                            Provenance = "Acquired from a private collector in Spain",
                            Winner = null,
                            SoldAmount = null,
                            CurrentHighBid = null
                        }
                    }
                },
                // 2 Vintage Watch Collection Auction
                new Auction
                {
                    Id = Guid.Parse("e2f8b607-d601-4218-93f8-d213a6d8f3f3"),
                    Title = "Vintage Watch Collection Auction",
                    Seller = "Prestige Timepieces",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    AuctionStart = DateTime.UtcNow,
                    AuctionEnd = DateTime.UtcNow.AddDays(15),
                    Status = Status.Live,
                    Items = new List<Item>
                    {
                        new Item
                        {
                            Id = Guid.NewGuid(),
                            Title = "Rolex Submariner",
                            Description = "An iconic diver's watch known for its resistance and timeless design.",
                            Dimensions = "Diameter: 40 mm",
                            Materials = "Stainless steel case, ceramic bezel",
                            ConditionReport = "Mint condition with minimal signs of wear",
                            ArtistOrMaker = "Rolex",
                            YearOfCreation = 1980,
                            ImageUrl = "https://cdn.pixabay.com/photo/2015/09/15/15/53/banknote-941246_960_720.jpg", // Placeholder image
                            Provenance = "Previously owned by a renowned maritime explorer",
                            Winner = null,
                            SoldAmount = null,
                            CurrentHighBid = null
                        },
                        new Item
                        {
                            Id = Guid.NewGuid(),
                            Title = "Omega Speedmaster Professional Moonwatch",
                            Description = "Famous for its history as the first watch worn on the moon during NASA's Apollo missions.",
                            Dimensions = "Diameter: 42 mm",
                            Materials = "Stainless steel",
                            ConditionReport = "Excellent condition, fully functional",
                            ArtistOrMaker = "Omega",
                            YearOfCreation = 1969,
                            ImageUrl = "https://cdn.pixabay.com/photo/2016/11/29/05/11/adult-1867461_960_720.jpg", // Placeholder image
                            Provenance = "Acquired at an estate sale in Houston, Texas",
                            Winner = null,
                            SoldAmount = null,
                            CurrentHighBid = null
                        },
                        new Item
                        {
                            Id = Guid.NewGuid(),
                            Title = "Patek Philippe Calatrava",
                            Description = "A symbol of luxury, renowned for its elegant and understated design.",
                            Dimensions = "Diameter: 36 mm",
                            Materials = "18k gold",
                            ConditionReport = "Very good condition, recently serviced",
                            ArtistOrMaker = "Patek Philippe",
                            YearOfCreation = 1975,
                            ImageUrl = "https://cdn.pixabay.com/photo/2017/03/27/13/54/bank-2178578_960_720.jpg", // Placeholder image
                            Provenance = "Inherited from a European royal family",
                            Winner = null,
                            SoldAmount = null,
                            CurrentHighBid = null
                        }
                    }
                }
            };


            context.AddRange(auctions);

            context.SaveChanges();
        }

    }
}
