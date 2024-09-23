import React from "react";
import Link from "next/link";

export default function AuctionCard(props) {
  const { auction } = props;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="card overflow-hidden text-center  h-full">
      <img src={auction.imageUrl} className="mx-auto object-contain"/>
      <div className="p-4">
        <h2
          className="text-lg my-2 truncate"
          style={{ textTransform: "uppercase" }}
        >
          {auction.title}
        </h2>
        <div className="">
          <p className="text-gray text-sm font-se mb-2 font-syne">
            {formatDate(auction.auctionStart)}
          </p>
          <Link href={`/user/auctions/details/${auction.id}`} className="inline-block px-4 underline text-sm hover:text-gray-500 tracking-widest cursor-pointer">
            VIEW LOTS
          </Link>
        </div>
      </div>
    </div>
  );
}
