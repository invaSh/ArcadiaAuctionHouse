"use client";

import React, { useEffect, useState } from "react";
import AuctionCard from "../components/auctions/AuctionCard";
import LiveAuctionCard from "../components/auctions/LiveAuctionCard";

export default function Listings() {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("http://localhost:6001/search/", {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("-----> couldn't fetch data");

        const data = await res.json();
        console.log(data.auctions);
        setAuctions(Array.isArray(data.auctions) ? data.auctions : []);
      } catch (e) {
        console.error("----->cant fetch", e);
      }
    };

    getData();
  }, []);

  return (
    <>
      <div className="p-4 mb-10 w-full">
        <h1 className="text-center mb-10 font-thin">Live Auctions</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {auctions.map((auction) => (
            <LiveAuctionCard key={auction.Id} auction={auction} />
          ))}
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-center mb-10 font-thin">Upcoming Auctions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {console.log("--> from the return element", auctions)}
          {auctions.length > 0 ? (
            auctions.map((auction, index) => (
              <AuctionCard key={index} auction={auction} />
            ))
          ) : (
            <div>No auctions available</div>
          )}
        </div>
      </div>
    </>
  );
}
