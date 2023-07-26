namespace OurBrosAPI.Data.Models;

public class Lobby
{
    public int Id { get; set; }
    public string LobbyName { get; set; }
    public List<User> Users { get; set; }
    
}