using System.Collections.ObjectModel;
using Microsoft.EntityFrameworkCore;
using OurBrosAPI.Data.Models;

namespace OurBrosAPI.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    
    public DbSet<Lobby> Lobbies { get; set; }
    public DbSet<User> Users { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    { 
        modelBuilder.Entity<Lobby>().HasData(
            new Lobby { Id = 1, LobbyName = "Lobby1"},
            new Lobby { Id = 2, LobbyName = "Lobby2"},
            new Lobby { Id = 3, LobbyName = "lobby3"}
        );
        modelBuilder.Entity<User>().HasData(
            new User { Id = 1, Name = "Jack" },
            new User { Id = 2, Name = "User 2" }
        );
    }
    
}

