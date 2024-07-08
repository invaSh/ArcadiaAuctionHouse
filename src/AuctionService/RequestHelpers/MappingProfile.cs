using AuctionService.DTOs.Auction;
using AuctionService.DTOs.Item;
using AuctionService.Models;
using AutoMapper;
using Contracts.Items;

namespace AuctionService.RequestHelpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Mapping for Auction to AuctionDto
            CreateMap<Auction, AuctionDto>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()))
                .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Items));

            // Mapping for Item to ItemDto
            CreateMap<Item, ItemDto>();

            // Mapping for CreateAuctionDto to Auction
            CreateMap<CreateAuctionDto, Auction>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => Enum.Parse<Status>(src.Status)));

            // Mapping for CreateItemDto to Item
            CreateMap<CreateItemDto, Item>();

            // Mapping for UpdateAuctionDto to Auction
            CreateMap<UpdateAuctionDto, Auction>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => Enum.Parse<Status>(src.Status)))
                .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Items));

            // Mapping for UpdateItemDto to Item
            CreateMap<UpdateItemDto, Item>();

            CreateMap<ItemDto, ItemCreated>();
        }
    }
}
