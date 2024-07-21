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
            var item = await _context.Items.FindAsync(context.Message.Id);
            var auction = await _context.Auctions.FindAsync(item.AuctionId);


            if (DateTime.UtcNow >= auction.AuctionEnd)
            {
                if (context.Message.ItemSell)
                {
                    if (context.Message.Amount >= item.ReservePrice)
                    {
                        item.Winner = context.Message.Winner;
                        item.SoldAmount = context.Message.Amount;
                        item.Sold = true;
                    }
                    else
                    {
                        item.Sold = false;
                    }
                }
                else
                {
                    item.Sold = false;
                }
            }
            else
            {
                Console.WriteLine("Auction has not ended yet.");
            }

            await _context.SaveChangesAsync();
        }
    }
}
