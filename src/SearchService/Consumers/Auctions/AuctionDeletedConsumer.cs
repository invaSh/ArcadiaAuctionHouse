using Contracts.Auctions;
using Contracts.Items;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers.Auctions
{
    public class AuctionDeletedConsumer : IConsumer<AuctionDeleted>
    {
        public async Task Consume(ConsumeContext<AuctionDeleted> context)
        {
            Console.WriteLine($"------->Received deletion event for Auction ID: {context.Message.Id}");

            try
            {
                var auction = await DB.Find<Auction>().OneAsync(context.Message.Id);


                if (auction == null)
                {
                    Console.WriteLine("Auction not found.");
                    return;
                }

                foreach (var item in auction.Items)
                {
                    item.AuctionId = null;
                }

                var result = await DB.DeleteAsync<Auction>(context.Message.Id);
                Console.WriteLine($"---->Auction has been successfully deleted from the search service.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting Auction from search service: {ex.Message}");
            }

        }
    }
}
