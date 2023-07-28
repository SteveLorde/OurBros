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
            new Lobby { Id = 1, LobbyName = "Lobby1", Users = null },
            new Lobby { Id = 2, LobbyName = "Lobby2", Users = null },
            new Lobby { Id = 3, LobbyName = "lobby3", Users = null }
        );
    }
    
}

