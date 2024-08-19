using AuctionService.Data;
using AuctionService.Models;
using Contracts.Auctions;
using MassTransit;

namespace AuctionService.Consumers
{
    public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
    {
        private readonly AuctionDbContext _context;

        public AuctionFinishedConsumer(AuctionDbContext context)
        {
            _context = context;
        }
        public async Task Consume(ConsumeContext<AuctionFinished> context)
        {
           var auction = await _context.Auctions.FindAsync(context.Message.AuctionId);

            await _context.SaveChangesAsync();
        }
    }
}                                                  
