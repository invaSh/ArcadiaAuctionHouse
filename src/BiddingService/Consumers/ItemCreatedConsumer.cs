using BiddingService.Models;
using Contracts.Items;
using MassTransit;
using MongoDB.Entities;

namespace BiddingService.Consumers
{
    public class ItemCreatedConsumer : IConsumer<ItemCreated>
    {
        public async Task Consume(ConsumeContext<ItemCreated> context)
        {
            var item = new Item
            {
                ID = context.Message.Id.ToString(),
                ReservePrice = context.Message.ReservePrice,
                AuctionId = context.Message.AuctionId,
            };

            await item.SaveAsync();
        }
    }
}
