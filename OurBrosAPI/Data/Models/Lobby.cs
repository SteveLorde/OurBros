using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;

namespace OurBrosAPI.Data.Models;

public class Lobby
{
    public int Id { get; set; }
    public string LobbyName { get; set; }

}