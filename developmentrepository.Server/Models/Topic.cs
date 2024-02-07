namespace developmentrepository.Server.Models;

public class Topic
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Theme { get; set; } = string.Empty;
    public IEnumerable<NoteFile> NoteFiles { get; set; } = new List<NoteFile>();
}
