namespace developmentrepository.Server.Models;

public class Topic
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Direction { get; set; } = string.Empty;
    public DateTime DateAdded { get; set; }
    public string TextPath { get; set; } = string.Empty;
}
