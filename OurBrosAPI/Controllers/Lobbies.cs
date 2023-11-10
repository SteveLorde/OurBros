using Microsoft.AspNetCore.Mvc;
using OurBrosAPI.Data.DTOs;
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
    public async Task<Lobby> GetLobbies(LobbyDTO lobbytofind)
    {
        var lobby = await _lobbyservice.GetLobbybyId(lobbytofind);
        return lobby;
    }
    
    //Create lobby
    //--------------------
    [HttpPost("CreateLobby")]
    public async Task CreateLobby(LobbyDTO newlobbyrequest, UserDTO user)
    {
        await _lobbyservice.CreateLobby(newlobbyrequest, user);
    }
    
    //Delete Lobby
    //------------
    [HttpDelete("DeleteLobby")]
    public async Task DeleteLobby(int id)
    {
        await _lobbyservice.DeleteLobby(id);
    }
    
}