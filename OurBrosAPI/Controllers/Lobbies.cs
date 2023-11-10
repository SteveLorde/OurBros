using Microsoft.AspNetCore.Mvc;
using OurBrosAPI.Data.Models;
using OurBrosAPI.Services.Chat;

namespace OurBrosAPI.Controllers;

[Route("Lobbies")]
[ApiController]
public class Lobbies : Controller
{
    //inject IDatabase service
    //--------------------------
    private readonly ILobbyService _lobbyservice;

    public Lobbies(ILobbyService lobbyService)
    {
        _lobbyservice = lobbyService;
    } 
    //--------------------------
    
    
    // GET Lobbies
    //---------------------
    [HttpGet("GetLobbies")]
    public async Task<List<Lobby>> GetLobbies()
    {
        var lobbies = await _lobbyservice.GetLobbies();
        return lobbies;
    }
    
    // GET Lobby By ID
    //---------------------
    [HttpGet("GetLobby/{id}")]
    public async Task<Lobby> GetLobbies(int id)
    {
        var lobby = await _lobbyservice.GetLobbybyId(id);
        return lobby;
    }
    
    //Create lobby
    //--------------------
    [HttpPost("CreateLobby")]
    public async Task CreateLobby(NewLobby _lobby)
    {
        await _lobbyservice.CreateLobby();
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