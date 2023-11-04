using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using OurBrosAPI.Data;
using OurBrosAPI.Data.Models;

namespace OurBrosAPI.Services.Database;

public interface IDatabase
{
    //users
    public void CreateUser();
    public Task<User> GetUser(string username);
    public void DeleteUser(int id);
    //lobbies
    public Task<List<Lobby>> GetLobbies();
    public Task<Lobby> GetLobbyById(int id);
    public Task CreateLobby(Lobby lobby);
    public Task UpdateLobby(int id, Lobby lobby);
    public Task DeleteLobby(int id);
    public Task GetUsersinLobby(int id);
    public Task RemoveUserFromLobby(string username);
}
