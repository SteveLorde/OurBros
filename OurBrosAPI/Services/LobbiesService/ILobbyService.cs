using OurBrosAPI.Data.Models;

namespace OurBrosAPI.Services.Chat;

public interface ILobbyService
{
    public bool InititateMemoryLobbies();
    public Task AddUserToLobby(string lobbyname, User usertoadd);
    public Task RemoveUserfromLobby(string lobbyname, string username);
}