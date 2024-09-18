import React from "react";
import {
  getUpcomingAuctions,
  getAllAuctions,
} from "@/app/actions/auctionActions";
import AuctionCard from "@/app/components/auctions/AuctionCard";

async function Auctions() {
  const upcomingAuctions = (await getUpcomingAuctions()).slice(0, 5);
  const auctions = (await getAllAuctions()).auctions;

  const liveAuctions = auctions.filter((auction) => auction.status === 0);
  const pastAuctions = auctions.filter(
    (a) => new Date() > new Date(a.auctionEnd)
  );

  return (
    <div className="container mx-auto p-8">
      <section className="mb-12">
        <h2 className="text-3xl font-bold my-12 text-center text-gray-600">Live Auctions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveAuctions.length ? (
            liveAuctions.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))
          ) : (
            <p className="text-center col-span-full">
              No live auctions available
            </p>
          )}
        </div>
      </section>

      <hr className="my-12" />

      <section className="mb-12">
        <h2 className="text-3xl font-bold my-12 text-center text-gray-600">
          Upcoming Auctions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingAuctions.length ? (
            upcomingAuctions.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))
          ) : (
            <p className="text-center col-span-full">
              No upcoming auctions available
            </p>
          )}
        </div>
      </section>
      <hr className="my-12" />

      <section className="mb-12">
        <h2 className="text-3xl font-bold my-12 text-center text-gray-600">Past Auctions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastAuctions.length ? (
            pastAuctions.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))
          ) : (
            <p className="text-center col-span-full">
              No past auctions available
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Auctions;
