namespace developmentrepository.Server.Models;

public class NoteFile
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Format { get; set; } = string.Empty;
    public string DownloadPath { get; set; } = string.Empty;
    public Guid TopicId { get; set; } = Guid.NewGuid();
    public Topic Topic { get; set; } = null!;
}
