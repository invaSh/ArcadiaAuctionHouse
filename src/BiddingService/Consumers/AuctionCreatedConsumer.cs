using BiddingService.Models;
using Contracts.Auctions;
using MassTransit;
using MongoDB.Entities;

namespace BiddingService.Consumers
{
    public class AuctionCreatedConsumer : IConsumer<AuctionCreated>
    {
        public async Task Consume(ConsumeContext<AuctionCreated> context)
        {
            Console.WriteLine("---->attempting to consume auction: ", context.Message.Id);
            var auction = new Auction
            {
                ID = context.Message.Id.ToString(),
                Seller = context.Message.Seller,
                AuctionEnd = context.Message.AuctionEnd,
            };

            await auction.SaveAsync();
        }
    }
}
