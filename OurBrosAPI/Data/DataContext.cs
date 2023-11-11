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
            new Lobby { Id = 1, lobbyname = "Lobby1"},
            new Lobby { Id = 2, lobbyname = "Lobby2"},
            new Lobby { Id = 3, lobbyname = "lobby3"}
        );
        modelBuilder.Entity<User>().HasData(
            new User {Id = 1, username = "TestUser1", userpassword = "1234"},
            new User {Id = 2, username = "TestUser2", userpassword = "1234"});
    }
    
}

