using AuctionService.Data;
using Contracts.Items;
using MassTransit;

namespace AuctionService.Consumers
{
    public class BidPlacedConsumer : IConsumer<BidPlaced>
    {
        private readonly AuctionDbContext _context;

        public BidPlacedConsumer(AuctionDbContext context)
        {
            _context = context;
        }
        public async Task Consume(ConsumeContext<BidPlaced> context)
        {
            Console.WriteLine("=====================================================================================>Consuming Bid");

            var item = await _context.Items.FindAsync(Guid.Parse(context.Message.ItemId));

            if(item.CurrentHighBid == null 
                || context.Message.Amount > item.CurrentHighBid)
            {
                item.CurrentHighBid = context.Message.Amount;
                await _context.SaveChangesAsync();
            }

        }
    }
}
