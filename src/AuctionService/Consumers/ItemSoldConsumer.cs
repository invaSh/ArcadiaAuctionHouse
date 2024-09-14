using AuctionService.Data;
using Contracts.Items;
using MassTransit;

namespace AuctionService.Consumers
{
    public class ItemSoldConsumer : IConsumer<ItemSold>
    {
        private readonly AuctionDbContext _context;

        public ItemSoldConsumer(AuctionDbContext context)
        {
            _context = context;
        }
        public async Task Consume(ConsumeContext<ItemSold> context)
        {
            Console.WriteLine("=======================================================================================================================================> consuming item" + context.Message.Id);

            var item = await _context.Items.FindAsync(Guid.Parse(context.Message.Id));
            var auction = await _context.Auctions.FindAsync(item.AuctionId);

            item.Winner = context.Message.Winner;
            item.SoldAmount = context.Message.Amount;
            item.Sold = true;
            item.CurrentHighBid = context.Message.Amount;

            await _context.SaveChangesAsync();
        }
    }
}
