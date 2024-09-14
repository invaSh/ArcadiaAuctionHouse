namespace NotificationService.Models
{
    public class Notification
    {
        public Guid Id { get; set; }
        public string Message { get; set; }
        public string EventType { get; set; }
        public bool Viewed { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
