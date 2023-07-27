using Microsoft.AspNetCore.SignalR;
using OurBrosAPI.Data.Models;

namespace OurBrosAPI.Services.Chat.Hubs;

public class ChatHub : Hub
{
    private readonly string _botUser;

    public ChatHub()
    {
        _botUser = "MyChat Bot";
    }
    public async Task JoinLobby(UserConnection userconnection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, userconnection.Lobby);
            
        await Clients.Group(userconnection.Lobby).SendAsync("ReceiveMessage", _botUser, $"{userconnection.user} has joined {userconnection.Lobby}");
    }
    
    
    /*
    public async Task SendMessage(string user,string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    public async Task ReceiveMessage()
    {
        
    }
    */
    
}