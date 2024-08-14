import React from "react";
import AuctionHero from "@/app/components/auctions/AuctionHero";
import { getDetailedView } from "@/app/actions/auctionActions";
import Link from "next/link";

async function Details({ params }) {
  const auction = await getDetailedView(params.id);

  const items = auction.items;

  return (
    <div>
      <AuctionHero auction={auction} />
      <div className="w-full flex justify-center gap-5 border-b border-gray-200 py-5 text-xl text-white tracking-wider" style={{ backgroundColor: "rgb(65, 61, 73)"}}>
        <p className="cursor-pointer text-gray-400">INFORMATION</p>
        <Link href={`/user/auctions/details/${params.id}`}>
          <p className="cursor-pointer text-hover">VIEW LOTS</p>
        </Link>
      </div>
    </div>
  );
}

export default Details;
