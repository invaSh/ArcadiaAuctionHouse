import React from "react";
import AuctionHero from "@/app/components/auctions/AuctionHero";
import { getDetailedView } from "@/app/actions/auctionActions";
import { filterItems } from "@/app/actions/searchActions";
import Items from "@/app/components/auctions/AuctionPageItems";
import Link from "next/link";

export default async function Details({ params }) {
  const auction = await getDetailedView(params.id);

  const items = auction.items;
  return (
    <div>
      <AuctionHero auction={auction} />
      <div className="w-full border-b border-gray-200">
        <div className="text-lg mx-auto w-[75%] flex justify-between px-7 py-3">
          <div className="flex gap-5">
            <Link href={`/user/auctions/info/${params.id}`}>
              <p className="cursor-pointer text-hover">INFORMATION</p>
            </Link>
            <p className="cursor-pointer text-gray-500">VIEW LOTS</p>
          </div>
          <div className="flex gap-5">
            <p>
              <span className="font-bold">643</span> registered bidders
            </p>
            |
            <p>
              <span className="font-bold">73%</span> lots with bids
            </p>
            |
            <p>
              <span className="font-bold">$486,300</span> bid total
            </p>
          </div>
        </div>
      </div>
      <Items items={items} />
    </div>
  );
}
