namespace HomeManagementCore.Models;

public class NotificationRequest
{
    public string userEmailAddress { get; set; }
    public string message { get; set; }

    public NotificationRequest(string emailAddress, string msg)
    {
        userEmailAddress = emailAddress;
        message = msg;
    }
}