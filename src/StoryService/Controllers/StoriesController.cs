using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoryService.Data;
using StoryService.DTOs;
using StoryService.Models;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StoryService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoriesController : ControllerBase
    {
        private readonly StoryDbContext _context;
        private readonly IMapper _mapper;

        public StoriesController(StoryDbContext storyDbContext, IMapper mapper)
        {
            _context = storyDbContext;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var stories = await _context.Stories.ToListAsync();
            if (stories.Count < 0) return BadRequest("Stories is empty");
            return Ok(stories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(Guid id)
        {
            var story = await _context.Stories.FirstOrDefaultAsync(x => x.Id == id);
            if (story == null) return NotFound("Story wasn't found or doesn't exist");
            return Ok(story);
        }

        [HttpPost]
        public async Task<ActionResult<Story>> Post(CreateStoryDto storyDto)
        {
            var story = _mapper.Map<Story>(storyDto);
            story.Author = User.FindFirstValue("name");
            story.PublishedDate = DateTime.UtcNow;
            _context.Stories.Add(story);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return BadRequest("Couldn't create story");
            return Ok(story);

        }

        [HttpPut("{id}")]
        public async Task <ActionResult> Put(Guid id, UpdateStoryDto storyDto)
        {
            var story = await _context.Stories.FirstOrDefaultAsync(s => s.Id == id);
            if(story == null) return NotFound("Story wasn't found or doesn't exist");
            _mapper.Map(storyDto, story);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return BadRequest("couldn't update story");
            return Ok(story);

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var story = await _context.Stories.FirstOrDefaultAsync(s => s.Id == id);
            if (story == null) return NotFound("Story not found or doesn't exist");
            _context.Stories.Remove(story);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return BadRequest("Couldn't delete story");
            return Ok("Story deleted successfully");

        }
    }
}
