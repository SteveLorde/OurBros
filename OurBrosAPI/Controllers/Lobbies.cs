using Microsoft.AspNetCore.Mvc;
using OurBrosAPI.Data.DTOs;
using OurBrosAPI.Data.Models;
using OurBrosAPI.Services.Chat;

namespace OurBrosAPI.Controllers;

[Route("Lobbies")]
[ApiController]
public class Lobbies : Controller
{
    //--------------------------
    private readonly ILobbyService _lobbyservice;

    public Lobbies(ILobbyService lobbyService)
    {
        _lobbyservice = lobbyService;
    } 
    //--------------------------
    

    [HttpGet("GetLobbies")]
    public async Task<List<Lobby>> GetLobbies()
    {
        var lobbies = await _lobbyservice.GetLobbies();
        return lobbies;
    }
    
    [HttpPost("GetLobby")]
    public async Task<Lobby> GetLobby(LobbyDTO lobbytofind)
    {
        return _lobbyservice.GetLobby(lobbytofind);
    }
    
    [HttpPost("CreateLobby")]
    public async Task CreateALobby(LobbyControllerDTO request)
    {
        await _lobbyservice.CreateLobby(request.LobbyDto, request.UserDto);
    }
    
    [HttpPost("JoinLobby")]
    public async Task JoinLobby(LobbyControllerDTO request)
    {
        await _lobbyservice.AddUserToLobby(request.LobbyDto, request.UserDto);
    }
    
    [HttpPost("QuitLobby")]
    public async Task QuitLobby(LobbyControllerDTO request)
    {
        await _lobbyservice.RemoveUserfromLobby(request.LobbyDto, request.UserDto);
    }

    [HttpDelete("DeleteLobby")]
    public async Task DeleteLobby(LobbyControllerDTO request)
    {
        await _lobbyservice.DeleteLobby(request.LobbyDto,request.UserDto);
    }
    
}