using AutoMapper;
using Contracts.Auctions;
using Contracts.Items;
using SearchService.Models;

namespace SearchService.RequestHelpers
{
    public class MappingProfiles :Profile
    {
        public MappingProfiles()
        {
            CreateMap<ItemCreated, Item>();
            CreateMap<ItemUpdated, Item>()
                .ForMember(dest => dest.ID, opt => opt.MapFrom(src => src.Id));
            CreateMap<ItemDeleted, Item>()
                .ForMember(dest => dest.ID, opt => opt.MapFrom(src => src.Id));
            CreateMap<AuctionCreated, Auction>()
                .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Items));
            CreateMap<AuctionUpdated, Auction>()
                .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Items));
        }
    }
}
