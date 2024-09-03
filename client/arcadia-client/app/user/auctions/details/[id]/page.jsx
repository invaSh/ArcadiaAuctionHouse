import React from "react";
import AuctionHero from "@/app/components/auctions/AuctionHero";
import { getDetailedView } from "@/app/actions/auctionActions";
import AuctionButton from "@/app/components/auctions/AuctionButton";
import AuctionItemCard from "@/app/components/auctions/AuctionItemCard";
import Link from "next/link";
import Button from "@/app/components/auctions/Button";

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
      <div className="w-[75%] mx-auto flex gap-5 mt-12">
        <Button text={"register to bid"} />
        <AuctionButton />
      </div>
      <div className="flex flex-wrap gap-5 mt-8 px-5">
        {items.length > 0 ? (
          items.map((item, index) => (
            <AuctionItemCard index={index} key={item.id} item={item} />
          ))
        ) : (
          <div className="col-span-12 text-center py-10">
            <p>No items available for this auction.</p>
          </div>
        )}
      </div>
    </div>
  );
}
