using Microsoft.AspNetCore.SignalR;

namespace OurBrosAPI.Services.Chat.Hubs;

public class ChatHub : Hub
{
    public async Task SendMessage(string user,string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    public async Task ReceiveMessage()
    {
        
    }
    
    
}