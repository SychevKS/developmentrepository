using developmentrepository.Server.Models;

using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext(IConfiguration config) : DbContext
{
    private readonly IConfiguration _config = config;

    public DbSet<Topic> Topics { get; set; } = null!;
    public DbSet<Note> Notes { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(_config["ConnectionStrings:DefaultConnection"]);
    }
}