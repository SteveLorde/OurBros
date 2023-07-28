using Microsoft.AspNetCore.SignalR;
using OurBrosAPI.Data;
using OurBrosAPI.Data.Models;
using OurBrosAPI.Services.Database;

namespace OurBrosAPI.Services.Chat.Hubs;

public class ChatHub : Hub
{
    private readonly DataContext _db;

    public ChatHub(DataContext db)
    {
        _db = db;
    }
    
    public async Task JoinLobby(int lobbyid)
    {
        var lobby = await _db.Lobbies.FindAsync(lobbyid);
        
        if (lobby == null)
        {
            throw new ArgumentException($"Lobby {lobbyid} not found");
        }
        
        await Groups.AddToGroupAsync(Context.ConnectionId, $"lobby-{lobbyid}");
            
        await Clients.Group($"lobby-{lobbyid}").SendAsync("UserJoined", Context.User.Identity.Name);
        
    }
    
    public async Task LeaveRoom(int lobbyid)
    {
        // Remove the client from the SignalR group for this room
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"lobby-{lobbyid}");

        // Notify other clients in the room that a user has left
        await Clients.Group($"lobby-{lobbyid}").SendAsync("UserLeft", Context.User.Identity.Name);
    }
    
    public async Task SendMessage(int lobbyid, string message)
    {
        // Send the message to all clients in the room
        await Clients.Group($"lobby-{lobbyid}").SendAsync("ReceiveMessage", Context.User.Identity.Name, message);
    }
    
}