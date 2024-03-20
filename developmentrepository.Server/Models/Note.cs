namespace developmentrepository.Server.Models;

public class Note
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Path { get; set; } = string.Empty;
    public Guid TopicId { get; set; } = Guid.NewGuid();
    public Topic Topic { get; set; } = null!;
}
