using Microsoft.EntityFrameworkCore;

namespace OurBrosAPI.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }
}