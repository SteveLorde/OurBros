using OurBrosAPI.Data.DTOs;
using OurBrosAPI.Data.Models;

namespace OurBrosAPI.Services.Chat;

public interface ILobbyService
{
    public Task<List<Lobby>> GetLobbies();
    public Lobby GetLobby(int lobbyid);
    public Task<bool> CreateLobby(LobbyDTO newlobby, UserDTO lobbyowner);
    public Task AddUserToLobby(LobbyDTO lobby, UserDTO usertoadd);
    public Task RemoveUserfromLobby(LobbyDTO lobby, UserDTO usertoremove);
    public Task<bool> DeleteLobby(LobbyDTO lobbytodelete,UserDTO lobbyowner);
}