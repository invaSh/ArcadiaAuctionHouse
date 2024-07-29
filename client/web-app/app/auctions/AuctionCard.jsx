import React from "react";

export default function AuctionCard(props) {
  const { auction } = props;

  return (
    <div className="card overflow-hidden text-center">
      <img src={auction.image} alt={auction.title} className="w-full h-auto" />
      <div className="p-4">
        <h2 className="text-lg font-bold my-2">{auction.title}</h2>
        <p className="text-gray text-sm font-se mb-2">{auction.date}</p>
        <a
          href={auction.link}
          className="inline-block px-4 underline hover:text-gray-500"
        >
          VIEW LOTS
        </a>
      </div>
    </div>
  );
}
