using Microsoft.EntityFrameworkCore;
using OurBrosAPI.Data.Models;

namespace OurBrosAPI.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    
    public DbSet<Lobby> Lobbies { get; set; }
    public DbSet<User> Users { get; set; }
    
}

