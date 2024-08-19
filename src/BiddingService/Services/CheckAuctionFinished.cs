

using BiddingService.Models;
using Contracts.Auctions;
using Contracts.Items;
using MassTransit;
using MongoDB.Entities;

namespace BiddingService.Services
{
    public class CheckAuctionFinished : BackgroundService
    {
        private readonly ILogger<CheckAuctionFinished> _logger;
        private readonly IServiceProvider _services;

        public CheckAuctionFinished(ILogger<CheckAuctionFinished> logger, IServiceProvider services)
        {
            _logger = logger;
            _services = services;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Starting check for finished auctions");

            stoppingToken.Register(() => _logger.LogInformation("--->Auction check is stopping"));

            while (!stoppingToken.IsCancellationRequested) 
            {
                await CheckAuctions(stoppingToken);

                await Task.Delay(5000);
            }
        }


        private async Task CheckAuctions(CancellationToken stoppingToken)
        {
            var finishedAuctions = await DB.Find<Auction>()
                .Match(x => x.AuctionEnd <= DateTime.UtcNow)
                .Match(x => !x.Finished)
                .ExecuteAsync(stoppingToken);

            if (finishedAuctions.Count == 0) return;

            _logger.LogInformation("==> Found {count} auctions that have completed", finishedAuctions.Count);

            using var scope = _services.CreateScope();
            var publishEndpoint = scope.ServiceProvider.GetRequiredService<IPublishEndpoint>();

            foreach (var auction in finishedAuctions)
            {
                foreach (var item in auction.Items)
                {
                    var highestBid = await DB.Find<Bid>()
                        .Match(b => b.ItemId == Guid.Parse(item.ID))
                        .Sort(b => b.Descending(b => b.Amount))
                        .ExecuteFirstAsync(stoppingToken);

                    if (highestBid != null && highestBid.Amount >= item.ReservePrice)
                    {
                        item.Winner = highestBid.Bidder;
                        item.SoldAmount = highestBid.Amount;
                        item.Sold = true;

                        var itemSold = new ItemSold
                        {
                            Id = item.ID.ToString(),
                            Amount = highestBid.Amount,
                            Seller = auction.Seller,
                            Winner = highestBid.Bidder,
                            ItemSell = true,
                            AuctionId = auction.ID.ToString()
                        };

                        await publishEndpoint.Publish(itemSold, stoppingToken);
                        _logger.LogInformation("Published ItemSold event for item {ItemId}.", item.ID);
                    }
                    else
                    {
                        var itemSold = new ItemSold
                        {
                            Id = item.ID.ToString(),
                            Amount = null,
                            Seller = auction.Seller,
                            Winner = null,
                            ItemSell = false,
                            AuctionId = auction.ID.ToString()
                        };

                        await publishEndpoint.Publish(itemSold, stoppingToken);
                        _logger.LogInformation("Published ItemSold event for unsold item {ItemId}.", item.ID);
                    }

                    await item.SaveAsync(null, stoppingToken); 
                }

                auction.Finished = true;
                auction.Status = "Finished";
                await auction.SaveAsync(null, stoppingToken);

                var auctionFinished = new AuctionFinished
                {
                    AuctionId = Guid.Parse(auction.ID),
                    Title = auction.Title,
                    EndedAt = auction.AuctionEnd,
                    TotalRevenue = auction.Items.Where(i => i.SoldAmount.HasValue).Sum(i => i.SoldAmount.Value),
                    Status = "Finished"
                };

                await publishEndpoint.Publish(auctionFinished, stoppingToken);
                _logger.LogInformation("Published AuctionFinished event for auction {AuctionId}.", auction.ID);
            }
        }
    }
}
