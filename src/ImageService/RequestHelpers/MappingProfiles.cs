
using Contracts.Items;
using Contracts.Auctions;
using AutoMapper;
using ImageService.Models;

namespace ImageService.RequestHelpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<ItemCreated, Item>();
            CreateMap<ItemUpdated, Item>();
            CreateMap<ItemDeleted, Item>();
            CreateMap<AuctionCreated, Auction>();
            CreateMap<AuctionUpdated, Auction>();
        }
    }
}
