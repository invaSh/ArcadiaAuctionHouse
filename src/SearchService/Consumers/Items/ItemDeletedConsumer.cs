using AutoMapper;
using Contracts.Items;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers.Items
{
    public class ItemDeletedConsumer : IConsumer<ItemDeleted>
    {
        public async Task Consume(ConsumeContext<ItemDeleted> context)
        {
            Console.WriteLine($"------->Received deletion event for Item ID: {context.Message.Id}");

            try
            {
                var result = await DB.DeleteAsync<Item>(context.Message.Id);
                Console.WriteLine($"---->Item has been successfully deleted from the search service.");
            }            
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting item from search service: {ex.Message}");
            }
        }
    }

}
