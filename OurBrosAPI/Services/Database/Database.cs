using OurBrosAPI.Data;
using OurBrosAPI.Data.Models;

namespace OurBrosAPI.Services.Database;

public interface IDatabase
{
    //users
    public void CreateUser();
    public void DeleteUser(int id);
    //lobbies
    public void CreateLobby(Lobby lobby);
    public void DeleteLobby(int id);
}

class Database : IDatabase
{
    private DataContext _context;

    public Database(DataContext context)
    {
        _context = context;
    }
    
    public void CreateUser()
    {
        throw new NotImplementedException();
    }

    public void DeleteUser(int id)
    {
        throw new NotImplementedException();
    }
    

    public void CreateLobby(Lobby lobby)
    {
        _context.Lobbies.Add(lobby);
    }

    public void DeleteLobby(int id)
    {
        var lobby = _context.Lobbies.SingleOrDefault(x => x.Id == id) ?? throw new ArgumentNullException("Lobby Not Found");
        _context.Lobbies.Remove(lobby);
    }
    
    
}