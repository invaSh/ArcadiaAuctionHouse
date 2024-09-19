using AutoMapper;
using StoryService.DTOs;
using StoryService.Models;

namespace StoryService.RequestHelpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CreateStoryDto, Story>();
            CreateMap<UpdateStoryDto, Story>()
               .ForMember(dest => dest.Title, opt => opt.Condition(src => src.Title != null))
               .ForMember(dest => dest.PublishedDate, opt => opt.Condition(src => src.PublishedDate != default(DateTime)))
               .ForMember(dest => dest.Content, opt => opt.Condition(src => src.Content != null))
               .ForMember(dest => dest.Summary, opt => opt.Condition(src => src.Summary != null))
               .ForMember(dest => dest.ImageUrl, opt => opt.Condition(src => src.ImageUrl != null))
               .ForMember(dest => dest.Label, opt => opt.Condition(src => src.Label != null));

        }
    }

}
