using AuctionService.Data;
using Contracts;
using MassTransit;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Consumers
{
    public class ImageUrlPublishedConsumer : IConsumer<ImageUrlPublished>
    {
        private readonly AuctionDbContext _context;

        public ImageUrlPublishedConsumer(AuctionDbContext context)
        {
            _context = context;
        }
        public async Task Consume(ConsumeContext<ImageUrlPublished> context)
        {
            Console.WriteLine("---------------------------------------------------------------------------------------------------Consuming image url", context.Message.ImageUrl);
            Console.WriteLine("---------------------------------------------------------------------------------------------------Consuming image url", context.Message);



            if (context.Message.ImageType.Contains("item") )
            {
                var item = await _context.Items.FindAsync(context.Message.AuctionId);
                if(context.Message.ImageType == "item")
                {
                    item.ImageUrls.Add(context.Message.ImageUrl);
                }
                else    if(context.Message.ImageType == "item-thumbnail")
                {
                    item.ImageUrl = context.Message.ImageUrl;
                }
            }
            else
            {
                var auction = await _context.Auctions.FindAsync(context.Message.AuctionId);
                if (context.Message.ImageType == "thumbnail") auction.ImageUrl = context.Message.ImageUrl;
                if (context.Message.ImageType == "banner") auction.BannerUrl = context.Message.ImageUrl;
            }

            

            await _context.SaveChangesAsync();
        }
    }
}
