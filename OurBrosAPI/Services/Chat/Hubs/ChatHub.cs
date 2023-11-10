using System.Text.RegularExpressions;
using Microsoft.AspNetCore.SignalR;
using OurBrosAPI.Data;
using OurBrosAPI.Data.DTOs;
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
    
    public async Task JoinLobby(LobbyDTO lobby,UserDTO user)
    {
        Lobby Lobby = _lobbyservice.GetLobby(lobby);
        await Groups.AddToGroupAsync(Context.ConnectionId, Lobby.lobbyname);
        await _lobbyservice.AddUserToLobby(lobby,user);
        await Clients.Group(Lobby.lobbyname).SendAsync("UserJoined", user.username);
    }

    public async Task ShowLobbyMembers(int lobbyid)
    {
        
    }

    public async Task LeaveLobby(LobbyDTO lobbytoleave, UserDTO usertoleave)
    {
        await _lobbyservice.RemoveUserfromLobby(lobbytoleave, usertoleave);
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, lobbytoleave.lobbyname);
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

  