using System.Net.Http.Headers;
using HomeManagementCore.Models;

namespace HomeManagementCore.services;

public class NotificationService 
{
    public NotificationService()
    {
    }

    public async void CreateProductAsync(NotificationRequest notificationRequest)
    {
        var client = new HttpClient();
        
        client.BaseAddress = new Uri("http://localhost:8080/");
        client.PostAsJsonAsync("api/email", notificationRequest);
    }
}