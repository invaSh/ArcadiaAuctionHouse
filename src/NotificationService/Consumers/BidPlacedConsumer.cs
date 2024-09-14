using Contracts.Auctions;
using Contracts.Items;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using NotificationService.Data;
using NotificationService.Hubs;
using NotificationService.Models;

namespace NotificationService.Consumers
{
    public class BidPlacedConsumer : IConsumer<BidPlaced>
    {
        private readonly IHubContext<NotificationHub> _hubContext;
        private readonly NotifyDbContext _context;
        public BidPlacedConsumer(IHubContext<NotificationHub> hubContext, NotifyDbContext context)
        {
            _hubContext = hubContext;
            _context = context;

        }
        public async Task Consume(ConsumeContext<BidPlaced> context)
        {
            Console.WriteLine("---->bid placed message recieved");

            var message = $"{context.Message.Bidder} has bid ${context.Message.Amount} on item with id #{context.Message.ItemId}";

            await _hubContext.Clients.All.SendAsync("BidPlaced", message);

            Console.WriteLine("----> Notification sent to all clients");

            var notification = new Notification
            {
                Id = Guid.NewGuid(),
                Message = message,
                EventType = "BidPlaced",
                CreatedAt = DateTime.UtcNow
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

        }
    }
}
