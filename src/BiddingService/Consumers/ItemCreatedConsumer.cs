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
            Console.WriteLine("---->attempting to consume item: ", context.Message.Id);
            var auction = await DB.Find<Auction>().OneAsync(context.Message.AuctionId);
            var item = new Item
            {
                ID = context.Message.Id.ToString(),
                ReservePrice = context.Message.ReservePrice,
                AuctionId = context.Message.AuctionId,
            };

            auction.Items.Add(item);

            await item.SaveAsync();
            await auction.SaveAsync();


            var result = auction.Items != null && auction.Items.Count > 0
    ? $"Items count: {auction.Items.Count}"
    : "No items found";

            Console.WriteLine("----> Auction after adding item: " + result);
        }
    }
}
