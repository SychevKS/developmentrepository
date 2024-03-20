namespace developmentrepository.Server.Models;

public class Topic
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Direction { get; set; } = string.Empty;
    public IEnumerable<Note> Notes { get; set; } = new List<Note>();
}
