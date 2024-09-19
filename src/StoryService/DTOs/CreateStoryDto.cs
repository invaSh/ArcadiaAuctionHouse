namespace StoryService.DTOs
{
    public class CreateStoryDto
    {
        public string Title { get; set; }
        public DateTime PublishedDate { get; set; }
        public string Content { get; set; }
        public string Summary { get; set; }
        public string ImageUrl { get; set; }
        public string Label { get; set; }
    }
}
