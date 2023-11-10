using System.Text.RegularExpressions;
using Microsoft.AspNetCore.SignalR;
using OurBrosAPI.Data;
using OurBrosAPI.Data.Models;

namespace OurBrosAPI.Services.Chat.Hubs;

public class ChatHub : Hub
{
    private readonly ILobbyService _lobbyservice;

    public ChatHub(ILobbyService lobbyService)
    {
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
        var lobby = _lobbyservice.GetLobbybyId(lobbyid);
        string lobbyName = lobbyid.ToString();
        await Groups.AddToGroupAsync(Context.ConnectionId, lobbyName);
        await _lobbyservice.AddUserToLobby(lobbyName,user);
        await Clients.Group(lobbyName).SendAsync("UserJoined", user.username);
    }

    public async Task ShowLobbyMembers(int lobbyid)
    {
        
    }

    public async Task LeaveLobby(int lobbyid, string username)
    {
        string lobbyName = lobbyid.ToString();
        await _lobbyservice.RemoveUserfromLobby(lobbyName, username);
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, lobbyName);
    }
    
    public async Task SendMessageInLobby(int lobbyid, string username , string message)
    {
        string lobbyName = lobbyid.ToString();
        Message messagetosend = new Message();
        messagetosend.username = username;
        messagetosend.message = message;
        await Clients.Group(lobbyName).SendAsync("ReceiveToLobby", messagetosend);
    }

    
}

  