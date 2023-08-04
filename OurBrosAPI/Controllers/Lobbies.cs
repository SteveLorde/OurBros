using Microsoft.AspNetCore.Mvc;
using OurBrosAPI.Data.Models;
using OurBrosAPI.Services.Database;

namespace OurBrosAPI.Controllers;

[Route("Lobbies")]
[ApiController]
public class Lobbies : Controller
{
    //inject IDatabase service
    //--------------------------
    private IDatabase _db;

    public Lobbies(IDatabase db)
    {
        _db = db;
    } 
    //--------------------------
    
    
    // GET Lobbies
    //---------------------
    [HttpGet("GetLobbies")]
    public async Task<List<Lobby>> GetLobbies()
    {
        var lobbies = await _db.GetLobbies();
        return lobbies;
    }
    
    // GET Lobby By ID
    //---------------------
    [HttpGet("GetLobby/{id}")]
    public async Task<Lobby> GetLobbies(int id)
    {
        var lobby = await _db.GetLobbyById(id);
        return lobby;
    }
    
    //Create lobby
    //--------------------
    [HttpPost("CreateLobby")]
    public async Task CreateLobby(Lobby _lobby)
    {
        await _db.CreateLobby(_lobby);
    }
    
    //Update Lobby
    //-------------
    [HttpPut("UpdateLobby")]
    public async Task UpdateLobby(int id, Lobby _lobby)
    {
        await _db.UpdateLobby(id, _lobby);
    }
    
    //Delete Lobby
    //------------
    [HttpDelete("DeleteLobby")]
    public async Task DeleteLobby(int id)
    {
        await _db.DeleteLobby(id);
    }
    
}