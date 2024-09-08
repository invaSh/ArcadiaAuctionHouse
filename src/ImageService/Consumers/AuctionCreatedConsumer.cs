
using Contracts.Auctions;
using ImageService.Models;
using MassTransit;
using MongoDB.Entities;


namespace ImageService.Consumers
{
    public class AuctionCreatedConsumer : IConsumer<AuctionCreated>
    {
        public async Task Consume(ConsumeContext<AuctionCreated> context)
        {
            Console.WriteLine("---->attempting to consume auction: ", context.Message.Id);

            var auction = new Auction { ID = context.Message.Id.ToString() };

            await auction.SaveAsync();

        }
    }
}
