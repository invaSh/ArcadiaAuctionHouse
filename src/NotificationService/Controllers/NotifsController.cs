using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotificationService.Data;
using NotificationService.Models;

namespace NotificationService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotifsController : ControllerBase
    {
        private readonly NotifyDbContext _context;

        public NotifsController(NotifyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Notification>>> GetNotifications()
        {
            var notifications = await _context.Notifications
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();

            return Ok(notifications);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> SetViewed(Guid id)
        {
            var notif = await _context.Notifications.FirstOrDefaultAsync(c => c.Id == id);

            if (notif == null) return BadRequest("huqi notifi");

            notif.Viewed = true;

            await _context.SaveChangesAsync();

            return Ok(notif);
        }
    }
}
