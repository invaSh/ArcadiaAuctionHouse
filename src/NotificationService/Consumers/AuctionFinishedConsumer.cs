using Contracts.Auctions;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using NotificationService.Data;
using NotificationService.Hubs;
using NotificationService.Models;

namespace NotificationService.Consumers
{
    public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
    {
        private readonly IHubContext<NotificationHub> _hubContext;
        private readonly NotifyDbContext _context;

        public AuctionFinishedConsumer(IHubContext<NotificationHub> hubContext, NotifyDbContext context)
        {
            _hubContext = hubContext;
            _context = context;
        }
        public async Task Consume(ConsumeContext<AuctionFinished> context)
        {
            Console.WriteLine("---->auction finished message recieved");

            var message = $"Auction with id ${context.Message.AuctionId} has ended";

            await _hubContext.Clients.All.SendAsync("AuctionFinished", context.Message);

            var notification = new Notification
            {
                Id = Guid.NewGuid(),
                Message = message,
                EventType = "AuctionFinished",
                CreatedAt = DateTime.UtcNow
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
        }
    }
}
