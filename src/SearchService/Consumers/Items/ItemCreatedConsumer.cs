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

        public IMapper Mapper { get; }

        public async Task Consume(ConsumeContext<ItemCreated> context)
        {
            Console.WriteLine("----> Consuming item created: " + context.Message.Id);

            var item = _mapper.Map<Item>(context);

            await item.SaveAsync();
        }
    }
}
