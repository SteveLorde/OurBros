using Microsoft.EntityFrameworkCore;
using OurBrosAPI.Data;
using OurBrosAPI.Data.Models;
using OurBrosAPI.Services.Chat;

namespace OurBrosAPI.Services.LobbiesService;

public class LobbyService : ILobbyService
{
    private readonly DataContext _db;

    public List<Lobby> lobbies;

    public LobbyService(DataContext db)
    {
        _db = db;
        lobbies = InititateLobbies();
    }
    private List<Lobby> InititateLobbies()
    {
        return _db.Lobbies.ToList();
    }

    public async Task<List<Lobby>> GetLobbies()
    {
        return lobbies;
    }

    public async Task<Lobby> GetLobbybyId(int lobbyid)
    {
        return lobbies.First(x => x.Id == lobbyid);
    }

    public async Task<bool> CreateLobby(string lobbyname, User lobbyowner)
    {
        Lobby newlobby = new Lobby { lobbyname = lobbyname, lobbyowner = lobbyowner.username, Users = new List<User> {new User {Id = lobbyowner.Id, username = lobbyowner.username} } };
        newlobby.usercount = newlobby.Users.Count;
        lobbies.Add(newlobby);
        return true;
    }

    public async Task AddUserToLobby(string lobbyname, User usertoadd)
    {
        Lobby lobby = lobbies.First(x => x.lobbyname == lobbyname);
        lobby.Users.Add(usertoadd);
        lobby.usercount = lobby.Users.Count;
    }
    
    public async Task RemoveUserfromLobby(string lobbyname, string username)
    {
        Lobby lobby = lobbies.First(x => x.lobbyname == lobbyname);
        var targettoremove = lobby.Users.First(x => x.username == username);
        lobby.Users.Remove(targettoremove);
        lobby.usercount = lobby.Users.Count;
    }

    public async Task<bool> DeleteLobby(string lobbyname, string username)
    {
        var lobby = lobbies.First(x => x.lobbyname == lobbyname);
        if (username == lobby.lobbyowner)
        {
            lobbies.Remove(lobby);
            return true;
        }
        else
        {
            return false;
        }
    }
}