using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;

namespace OurBrosAPI.Data.Models;

public class Lobby
{
    public int Id { get; set; }
    public string lobbyname { get; set; }
    public string? lobbypassword { get; set; }
    public string? lobbyowner { get; set; }
    [NotMapped]
    public List<User> Users { get; set; }
    public int? usercount { get; set; }

}