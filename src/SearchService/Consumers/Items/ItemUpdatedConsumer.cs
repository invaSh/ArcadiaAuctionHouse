using AutoMapper;
using Contracts.Items;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers.Items
{
    public class ItemUpdatedConsumer : IConsumer<ItemUpdated>
    {
        private readonly IMapper _mapper;
        public ItemUpdatedConsumer(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task Consume(ConsumeContext<ItemUpdated> context)
        {
            Console.WriteLine("---->Consuming updated item: " +  context.Message.Id);
            if (context.Message.AuctionId == Guid.Empty)
            {
                Console.WriteLine("Error: Auction ID is empty.");
                return;
            }

            try
            {
                var existingItem = await DB.Find<Item>().OneAsync(context.Message.Id);
                if (existingItem == null)
                {
                    Console.WriteLine("----> Item not found for ID: " + context.Message.Id);
                    return; 
                }

                _mapper.Map(context.Message, existingItem);

                await existingItem.SaveAsync();
                Console.WriteLine("----> Updated Item saved successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine("----> Error saving updated item: " + ex.Message);
            }
        }
    }
}
