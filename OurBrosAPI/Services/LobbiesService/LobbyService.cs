using Microsoft.EntityFrameworkCore;
using OurBrosAPI.Data;
using OurBrosAPI.Data.Models;

namespace OurBrosAPI.Services.Chat;

public class LobbyService : ILobbyService
{
    private readonly DataContext _db;

    public List<Lobby> lobbies;

    public LobbyService(DataContext db)
    {
        _db = db;
        InititateMemoryLobbies();
    }
    public bool InititateMemoryLobbies()
    {
        lobbies = _db.Lobbies.ToList();
        return true;
    }

    public async Task AddUserToLobby(string lobbyname, User usertoadd)
    {
        Lobby lobby = lobbies.First(x => x.LobbyName == lobbyname);
        lobby.Users.Add(usertoadd);
    }
    
    public async Task RemoveUserfromLobby(string lobbyname, string username)
    {
        Lobby lobby = lobbies.First(x => x.LobbyName == lobbyname);
        var targettoremove = lobby.Users.First(x => x.Name == username);
        lobby.Users.Remove(targettoremove);
    }
    
    
}