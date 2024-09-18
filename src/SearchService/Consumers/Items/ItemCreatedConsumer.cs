using AutoMapper;
using Contracts.Items;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers.Items
{
    public class ItemCreatedConsumer : IConsumer<ItemCreated>
    {
        private readonly IMapper _mapper;
        public ItemCreatedConsumer(IMapper mapper)
        {
            _mapper = mapper;
        }


        public async Task Consume(ConsumeContext<ItemCreated> context)
        {
            if (context.Message.Id == Guid.Empty)
            {
                Console.WriteLine("Received ItemUpdated with empty ID.");
                return;
            }


            Console.WriteLine("----> Consuming item created: " + context.Message.Id);

            try
            {
                var item = _mapper.Map<Item>(context.Message);
                var auction = await DB.Find<Auction>().OneAsync(context.Message.AuctionId);

                await item.SaveAsync();
                Console.WriteLine("----> Item saved successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine("----> Error saving item: " + ex.Message);
            }
        }

    }
}
