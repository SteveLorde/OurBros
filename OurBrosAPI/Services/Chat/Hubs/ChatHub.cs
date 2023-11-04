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

    public async Task SendToAll(string username , string message)
    {
        Message messagetosend = new Message();
        messagetosend.username = username;
        messagetosend.message = message;
        await Clients.All.SendAsync("ReceiveToAll", messagetosend);
    }
    
    public async Task AddToGroup(int lobbyid,string username)
    {
        var lobby = _db.Lobbies.FirstOrDefault(x => x.Id == lobbyid);
        //lobby.users.Add(username);
        _db.Lobbies.Update(lobby);
        string groupName = lobbyid.ToString();
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
    }

    public async Task ShowGroupMembers(int lobbyid)
    {
        
    }

    public async Task RemoveFromGroup(int lobbyid)
    {
        string groupName = lobbyid.ToString();
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
    }
    
    public async Task SendToLobby(int lobbyid, string username , string message)
    {
        string groupName = lobbyid.ToString();
        Message messagetosend = new Message();
        messagetosend.username = username;
        messagetosend.message = message;
        await Clients.Group(groupName).SendAsync("ReceiveToLobby", messagetosend);
    }

    
}

  