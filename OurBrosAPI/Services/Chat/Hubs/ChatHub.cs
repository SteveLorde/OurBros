using System.Text.RegularExpressions;
using Microsoft.AspNetCore.SignalR;
using OurBrosAPI.Data;
using OurBrosAPI.Data.Models;
using OurBrosAPI.Services.Database;

namespace OurBrosAPI.Services.Chat.Hubs;

public class ChatHub : Hub
{
    private readonly DataContext _db;
    private readonly ILobbyService _lobbyservice;

    public ChatHub(DataContext db, ILobbyService lobbyService)
    {
        _db = db;
        _lobbyservice = lobbyService;
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
    
    public async Task SendToAll(string username , string message)
    {
        Message messagetosend = new Message();
        messagetosend.username = username;
        messagetosend.message = message;
        await Clients.All.SendAsync("ReceiveToAll", messagetosend);
    }
    
    public async Task JoinLobby(int lobbyid,User user)
    {
        var lobby = _db.Lobbies.FirstOrDefault(x => x.Id == lobbyid);
        string lobbyName = lobbyid.ToString();
        await Groups.AddToGroupAsync(Context.ConnectionId, lobbyName);
        await _lobbyservice.AddUserToLobby(lobbyName,user);
        await Clients.Group(lobbyName).SendAsync("UserJoined", user.Name);
    }

    public async Task ShowLobbyMembers(int lobbyid)
    {
        
    }

    public async Task LeaveLobby(int lobbyid)
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

  