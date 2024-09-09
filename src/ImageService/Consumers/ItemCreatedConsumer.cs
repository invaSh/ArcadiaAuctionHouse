using Contracts.Items;
using ImageService.Models;
using MassTransit;
using MongoDB.Entities;

namespace ImageService.Consumers
{
    public class ItemCreatedConsumer : IConsumer<ItemCreated>
    {
        public async Task Consume(ConsumeContext<ItemCreated> context)
        {
            Console.WriteLine("---->attempting to consume item: ", context.Message.Id);

            var auction = new Item { ID = context.Message.Id.ToString() };

            await auction.SaveAsync();

        }
    }
}
