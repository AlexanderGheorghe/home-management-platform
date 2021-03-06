using System.Text.Json.Serialization;

namespace HomeManagementCore.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public bool ConfirmedEmail { get; set; }
    }
}
