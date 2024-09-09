import React from "react";


export default function AuctionHero({ auction }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const timeOptions = { hour: "2-digit", hour12: true };
    return date.toLocaleTimeString("en-US", timeOptions);
  };

  console.log(auction);
  

  return (
    <div
      className="h-[70vh] w-[100%] text-white px-12 flex flex-col justify-between  tracking-widest"
      style={{
        backgroundImage:
          `url(${auction.bannerUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-[80%] mx-auto">
        <h3
          className="text-2xl font-thin text-violet-100"
          style={{ paddingTop: "100px" }}
        >
          Auction / {formatDate(auction.auctionStart)} /{" "}
          {formatTime(auction.auctionStart)}
        </h3>
        <hr />
      </div>
      <div className="flex justify-between mb-10 align-middle">
        <h1 className="text-6xl p-10 my-auto text-shadow">{auction.title}</h1>
        <div className="p-10 text-6xl" style={{ backgroundColor: "rgb(65, 61, 73)" }}>
          <p className="text-base text-center">LIVE AUCTION</p>
          24d : 35h : 32 s
        </div>
      </div>
    </div>
  );
}
