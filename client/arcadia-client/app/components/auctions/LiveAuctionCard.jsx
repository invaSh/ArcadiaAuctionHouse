import React from "react";

function LiveAuctionCard({ auction }) {
  return (
    <div className="grid grid-cols-12 gap-4 p-4 shadow-2xl">
      <div className="col-span-12 md:col-span-4 h-64 md:h-auto">
        <img
          src={auction.imageUrl}
          alt={auction.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="col-span-12 md:col-span-8">
        <h1 className="text-5xl font-bold text-gray-700">
          {/* <CountDownTimer auctionEnd={new Date(auction.auctionEnd)} /> */}
        </h1>
        <h3 className="text-2xl pb-3 pt-5 border-b-2 font-thin" style={{ textTransform: "uppercase" }}>
          {auction.title}
        </h3>
        <div className="truncate-container">
        <p className="text-base mt-4 font-normal truncate-text">
          {auction.description}
        </p>
        </div>
        
        <a href={`/auctions/${auction.Id}`} className="inline-block underline text-sm hover:text-gray-600 tracking-widest cursor-pointer font-medium">
          VIEW AUCTION IN FULL
        </a>
      </div>
    </div>
  );
}

export default LiveAuctionCard;
