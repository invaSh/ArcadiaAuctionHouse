using MassTransit;
using Microsoft.EntityFrameworkCore;
using NotificationService.Models;

namespace NotificationService.Data
{
    public class NotifyDbContext : DbContext
    {
        public NotifyDbContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<Notification> Notifications { get; set; }

    }
}
