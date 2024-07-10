using Contracts.Items;
using MassTransit;

namespace AuctionService.Consumers
{
    public class ItemCreatedFaultConsumer : IConsumer<Fault<ItemCreated>>
    {
        public async Task Consume(ConsumeContext<Fault<ItemCreated>> context)
        {
            Console.WriteLine("---> Consuming faulty creation");

            var exception = context.Message.Exceptions.First();

            if (exception.ExceptionType == "System.ArgumentException")
            {

            }
        }
    }
}
