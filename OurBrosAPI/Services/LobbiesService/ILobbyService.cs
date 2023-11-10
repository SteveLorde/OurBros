using OurBrosAPI.Data.Models;

namespace OurBrosAPI.Services.Chat;

public interface ILobbyService
{
    public Task<List<Lobby>> GetLobbies();
    public Task<Lobby> GetLobbybyId(int lobbyid);
    public Task<bool> CreateLobby(string lobbyname, User lobbyowner);
    public Task AddUserToLobby(string lobbyname, User usertoadd);
    public Task RemoveUserfromLobby(string lobbyname, string username);
    public Task<bool> DeleteLobby(string lobbyname,string username);
}