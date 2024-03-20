namespace developmentrepository.Server.Controllers;

using developmentrepository.Server.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/topics")]
public class TopicController(ApplicationDbContext dbContext) : ControllerBase
{
    private readonly ApplicationDbContext _dbContext = dbContext;

    [HttpGet()]
    public ActionResult GetTopics()
    {
        var topics = _dbContext.Topics.ToList();
        return Ok(topics);
    }

    [HttpGet("directions")]
    public ActionResult GetDirectionsByTopic()
    {
        var directions = _dbContext.Topics.Select(x => x.Direction).Distinct().ToList();
        return Ok(directions);
    }

    [HttpPost()]
    public async Task<ActionResult> AddTopic(Topic topic)
    {
        _dbContext.Topics.Add(topic);
        await _dbContext.SaveChangesAsync();

        return Ok(topic);
    }

    [HttpDelete("{topicId}")]
    public async Task<ActionResult> RemoveTopic(Guid topicId)
    {
        var topic = await _dbContext.Topics.FirstOrDefaultAsync(x => x.Id == topicId);

        if (topic == null)
            return BadRequest($"Topic id={topicId} not found.");

        _dbContext.Topics.Remove(topic);
        await _dbContext.SaveChangesAsync();

        return Ok(topic);
    }

    [HttpPost("notes")]
    public async Task<ActionResult> UploadFileNotes(Guid topicId, List<IFormFile> files)
    {
        if (files == null || files.Count == 0)
            return BadRequest("No files received.");

        foreach (var file in files)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), $"topics/{topicId}", file.FileName);

            using var stream = System.IO.File.Create(filePath);
            await file.CopyToAsync(stream);
        }

        return Ok("Files uploaded successfully.");
    }
}
