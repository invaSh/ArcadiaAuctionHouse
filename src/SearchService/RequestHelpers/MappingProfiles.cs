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
        }
    }
}
