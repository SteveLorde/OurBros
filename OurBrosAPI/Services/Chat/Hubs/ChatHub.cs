using Microsoft.AspNetCore.SignalR;

namespace OurBrosAPI.Services.Chat.Hubs;

public class ChatHub : Hub
{
    public async Task SendMessage(string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", message);
    }

    public async Task ReceiveMessage()
    {
        
    }
    
    
}