using AutoMapper;
using Contracts.Auctions;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers.Auctions
{
    public class AuctionCreatedConsumer : IConsumer<AuctionCreated>
    {
        private readonly IMapper _mapper;
        public AuctionCreatedConsumer(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task Consume(ConsumeContext<AuctionCreated> context)
        {
            Console.WriteLine($"----> Consuming created auction with ID: ${context.Message.Id}");

            try
            {
                var auction = _mapper.Map<Auction>(context.Message);

                await auction.SaveAsync();

                foreach (var item in auction.Items)
                {
                    await item.SaveAsync();
                }

                Console.WriteLine("----> Auction saved successfully");

                var savedAuction = await DB.Find<Auction>().OneAsync(auction.ID);
                Console.WriteLine(savedAuction != null ? "Verification Success: Auction found in DB." : "Verification Failure: Auction not found in DB.");


            }
            catch (Exception ex)
            {
                Console.WriteLine("------>Error saving auction" + ex.ToString());
            }
        }
    }
}
