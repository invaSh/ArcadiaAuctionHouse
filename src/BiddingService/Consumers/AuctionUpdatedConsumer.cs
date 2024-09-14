﻿using AutoMapper;
using Contracts.Auctions;
using MassTransit;
using MongoDB.Entities;
using BiddingService.Models;

namespace BiddingService.Consumers.Auctions
{
    public class AuctionUpdatedConsumer : IConsumer<AuctionUpdated>
    {
        private readonly IMapper _mapper;

        public AuctionUpdatedConsumer(IMapper mapper)
        {
            _mapper = mapper;
        }
        public async Task Consume(ConsumeContext<AuctionUpdated> context)
        {
            Console.WriteLine("---->Consuming updated auction: " + context.Message.Id);
            

            try
            {
                var existingAuction = await DB.Find<Auction>().OneAsync(context.Message.Id);
                if (existingAuction == null)
                {
                    Console.WriteLine("----> Auction not found for ID: " + context.Message.Id);
                    return;
                }

                existingAuction.ID = context.Message.Id.ToString();
                existingAuction.AuctionEnd = context.Message.AuctionEnd;
                existingAuction.Status = context.Message.Status;

                await existingAuction.SaveAsync();
                Console.WriteLine("----> Auction Item saved successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine("----> Error saving updated Auction: " + ex.Message);
            }
        }
    }
}
