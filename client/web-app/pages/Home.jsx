"use client";
import React, { useEffect, useState } from "react";
import AuctionCard from "../app/components/auctions/AuctionCard";
import LiveAuctionCard from "../app/components/auctions/LiveAuctionCard";
import AuctionBanner from "@/app/components/auctions/AuctionBanner";
import StoryCard from "@/app/components/blogs/StoryCard";
import Browse from "@/app/components/auctions/Browse";
import RegisterBanner from "@/app/components/RegisterBanner"

export default function Home() {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("http://localhost:6001/auctions/", {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("-----> couldn't fetch data");

        const data = await res.json();
        setAuctions(Array.isArray(data.auctions) ? data.auctions : []);
      } catch (e) {
        console.error("----->cant fetch", e);
      }
    };

    getData();
  }, []);

  return (
    <>
      <AuctionBanner />

      <div className="grid grid-cols-12 p-10 justify-center gap-10 my-10">
        <StoryCard />
        <StoryCard />
        <StoryCard />
      </div>

      <div className="grid grid-cols-12 gap-10 px-10 my-12">
        <Browse
          subtitle={"FIND WHAT YOU LOVE"}
          title={"Browse all art and items"}
        />
        <Browse
          subtitle={"NAMES TO KNOW"}
          title={"Featured artists or makers"}
        />
      </div>

      <AuctionBanner />

      <div className="p-4 m-12">
        <h2 className="text-center text-6xl tracking-widest my-10 font-thin py-10">
          Upcoming Auctions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {auctions.length > 0 ? (
            auctions.map((auction, index) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))
          ) : (
            <div>No auctions available</div>
          )}
        </div>
      </div>

      <AuctionBanner />

      <div className="p-4 mb-10 w-full">
        <h1 className="text-center mb-10 text-6xl tracking-widest my-10 font-thin py-10">
          Live Auctions
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {auctions.slice(0, 2).map((auction) => (
            <LiveAuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      </div>

      <RegisterBanner/>
      
    </>
  );
}
