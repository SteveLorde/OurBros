using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using OurBrosAPI.Data;
using OurBrosAPI.Data.Models;

namespace OurBrosAPI.Services.Database;

public interface IDatabase
{
    //users
    public void CreateUser();
    public void DeleteUser(int id);
    //lobbies
    public Task<List<Lobby>> GetLobbies();
    public Task CreateLobby(Lobby lobby);
    public Task UpdateLobby(int id, Lobby lobby);
    public Task DeleteLobby(int id);
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

    public async Task<List<Lobby>> GetLobbies()
    {
        List<Lobby> lobbies = await _context.Lobbies.ToListAsync();
        return lobbies;
    }

    public async Task CreateLobby(Lobby lobby)
    {
         _context.Lobbies.Add(lobby);
         await _context.SaveChangesAsync();
    }

    public async Task UpdateLobby(int id, Lobby _lobby)
    {
        var lobby = _context.Lobbies.SingleOrDefault(x => x.Id == id);
        lobby = _lobby;
        _context.Lobbies.Update(lobby);
        await _context.SaveChangesAsync();

    }

    public async Task DeleteLobby(int id)
    {
        var lobby = _context.Lobbies.SingleOrDefault(x => x.Id == id) ?? throw new ArgumentNullException("Lobby Not Found");
        _context.Lobbies.Remove(lobby);
        await _context.SaveChangesAsync();
    }
    
    
}