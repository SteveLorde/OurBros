using Microsoft.EntityFrameworkCore;
using OurBrosAPI.Data;
using OurBrosAPI.Data.DTOs;
using OurBrosAPI.Data.Models;
using OurBrosAPI.Services.Chat;

namespace OurBrosAPI.Services.LobbiesService;

public class LobbyService : ILobbyService
{
    private readonly DataContext _db;

    public List<Lobby> lobbies;
    private Timer _timer;


    public LobbyService(DataContext db)
    {
        _db = db;
        lobbies = InititateLobbies();
        //_timer = new Timer(PeriodicSaving, null, TimeSpan.FromMinutes(1), TimeSpan.FromMinutes(1));
    }
    private List<Lobby> InititateLobbies()
    {
        return _db.Lobbies.ToList();
    }

    public async Task<List<Lobby>> GetLobbies()
    {
        return lobbies;
    }

    public Lobby GetLobby(LobbyDTO lobbytofind)
    {
        return lobbies.First(x => x.lobbyname == lobbytofind.lobbyname);
    }

    public async Task<bool> CreateLobby(LobbyDTO newlobby, UserDTO clientlobbyowner)
    {
        
        User lobbyowner = await _db.Users.FirstAsync(x => x.username == clientlobbyowner.username);
        Lobby newLobby = new Lobby { lobbyname = newlobby.lobbyname, lobbyowner = lobbyowner.username, Users = new List<User> {new User(lobbyowner.Id,lobbyowner.username,lobbyowner.userpassword)} };
        newlobby.usercount = newLobby.Users.Count;
        lobbies.Add(newLobby);
        return true;
    }

    public async Task AddUserToLobby(LobbyDTO lobby, UserDTO clientusertoadd)
    {
        Lobby Lobby = lobbies.First(x => x.lobbyname == lobby.lobbyname);
        User usertoadd = _db.Users.First(x => x.username == clientusertoadd.username);
        Lobby.Users.Add(usertoadd);
        lobby.usercount = Lobby.Users.Count;
    }
    
    public async Task RemoveUserfromLobby(LobbyDTO lobby, UserDTO usertoremove)
    {
        Lobby Lobby = lobbies.First(x => x.lobbyname == lobby.lobbyname);
        var targettoremove = Lobby.Users.First(x => x.username == usertoremove.username);
        Lobby.Users.Remove(targettoremove);
        Lobby.usercount = Lobby.Users.Count;
    }

    public async Task<bool> DeleteLobby(LobbyDTO lobbytodelete, UserDTO lobbyowner)
    {
        var lobby = lobbies.First(x => x.lobbyname == lobbytodelete.lobbyname);
        if (lobbyowner.username == lobby.lobbyowner)
        {
            lobbies.Remove(lobby);
            return true;
        }
        else
        {
            return false;
        }
    }
    
    /*
    private void PeriodicSaving(object? state)
    {
        foreach (Lobby lobby in lobbies)
        {
            _db.Lobbies.Update(lobby);
        }
    }
    */


}