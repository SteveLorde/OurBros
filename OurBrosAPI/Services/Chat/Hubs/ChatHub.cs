using System.Text.RegularExpressions;
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
    
    //SignalR Test Methods
    //--------------------
    public override async Task OnConnectedAsync()
    {
        await Clients.All.SendAsync("connect", "SignalR Backend saying Hello :)");
        await base.OnConnectedAsync();
    }
    
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        await base.OnDisconnectedAsync(exception);
    }

    public async Task TestSend()
    {
        await Clients.All.SendAsync("TestReceive", "test message invoked successfully");
    }
    
    public async Task SendToAll(string message)
    {
        await Clients.All.SendAsync("ReceiveToAll", message);
    }

    
    //-------------------
    
    
    public async Task JoinLobby(int lobbyid)
    {
        string groupName = lobbyid.ToString();
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        await Clients.Group($"{lobbyid}").SendAsync("UserJoined", Context.ConnectionId);
    }
    
    public async Task SendMessageInGroup(int lobbyid, string message)
    {
        // Send the message to all clients in the room
        await Clients.Group($"{lobbyid}").SendAsync("ReceiveMessage", message);
    }
    
}

  