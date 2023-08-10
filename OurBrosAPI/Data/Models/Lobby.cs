using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace OurBrosAPI.Data.Models;

public class Lobby
{
    public int Id { get; set; }
    public string LobbyName { get; set; }
    
    public List<string> Users { get; set; }
    
}