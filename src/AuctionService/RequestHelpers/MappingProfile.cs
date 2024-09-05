using AuctionService.DTOs.Auction;
using AuctionService.DTOs.Item;
using AuctionService.Models;
using AutoMapper;
using Contracts.Auctions;
using Contracts.Items;

namespace AuctionService.RequestHelpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Auction, AuctionDto>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()))
                .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Items));

            CreateMap<Item, ItemDto>();

            CreateMap<CreateAuctionDto, Auction>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => Enum.Parse<Status>(src.Status)));

            CreateMap<CreateItemDto, Item>();

            CreateMap<UpdateAuctionDto, Auction>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => Enum.Parse<Status>(src.Status)))
                .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Items));

            CreateMap<UpdateItemDto, Item>();

            CreateMap<ItemDto, ItemCreated>();

            CreateMap<UpdateItemDto, ItemUpdated>();

            CreateMap<Item, ItemDeleted>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));

            CreateMap<Auction, AuctionCreated>()
                .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Items));

            CreateMap<CreateItemDto, ItemCreated>();

            CreateMap<UpdateAuctionDto, AuctionUpdated>()
                .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Items));
        }
    }
}
