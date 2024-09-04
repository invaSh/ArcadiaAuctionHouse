namespace IdentityService.DTOs
{
    public class UpdateUserDto
    {
        public string Username { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string? Password { get; set; }
        public string? OldPassword { get; set; }
        public string Role { get; set; }
    }
}
