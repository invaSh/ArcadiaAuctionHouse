import React, { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useSearch } from "@/context/SearchContext";

function SearchModal(props) {
  const { closeSearch } = useSearch();

  if (!props.open) return null;

  const auctions = props.res.auctions;
  const items = props.res.items;

  const now = new Date();

  const upcomingAuctions = auctions.filter(
    (auction) => new Date(auction.auctionStart) > now
  );
  const pastOrLiveAuctions = auctions.filter(
    (auction) => new Date(auction.auctionStart) <= now
  );

  const upcomingItems = items.filter((item) =>
    upcomingAuctions.some((auction) => auction.id === item.auctionId)
  );

  const pastOrLiveItems = items.filter((item) =>
    pastOrLiveAuctions.some((auction) => auction.id === item.auctionId)
  );

  return (
    <div className="absolute w-[100%]" style={{  zIndex: "10" }}>
      <div className="animate__animated animate__slideInDown" id="modal">
        <div className="flex justify-end pt-5 pr-5 bg-slate-100">
          <IoCloseSharp
            onClick={closeSearch}
            className="text-4xl cursor-pointer hover:bg-violet-100 rounded-md"
            style={{ transition: ".4s" }}
          />
        </div>
        <div
          className="grid grid-cols-12 gap-10 p-10 bg-slate-100 lg:h-[100vh]"
          style={{ width: "100%" }}
        >
          <div className="col-span-12 lg:col-span-3 mx-auto justify-center">
            <h3 className="text-2xl border-b-2 mr-10 pb-3 truncate">
              Upcoming Auctions{" "}
              <span className="text-gray-400">({upcomingAuctions.length})</span>
            </h3>
            {upcomingAuctions.map((auction) => (
              <div className="grid grid-cols-12 gap-5 pt-5" key={auction.id}>
                <div className="col-span-12 md:col-span-4 h-64 md:h-auto">
                  <img
                    src={auction.imageUrl}
                    alt=""
                    className="h-full object-cover"
                  />
                </div>
                <div className="col-span-12 md:col-span-8">
                  <h4 className="text-xl mb-5 truncate">{auction.title}</h4>
                  <p className="font-syne mb-5">{auction.seller}</p>
                  <a className="underline hover:text-gray-500 tracking-widest cursor-pointer">
                    VIEW LOTS
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-12 lg:col-span-3 mx-auto justify-center">
            <h3 className="text-2xl border-b-2 mr-10 pb-3 truncate">
              Past/Live Auctions{" "}
              <span className="text-gray-400">
                ({pastOrLiveAuctions.length})
              </span>
            </h3>
            {pastOrLiveAuctions.map((auction) => (
              <div className="grid grid-cols-12 gap-5 pt-5" key={auction.id}>
                <div className="col-span-12 md:col-span-4 h-64 md:h-auto">
                  <img
                    src={auction.imageUrl}
                    alt=""
                    className="h-full object-cover"
                  />
                </div>
                <div className="col-span-12 md:col-span-8">
                  <h4 className="text-xl mb-5 truncate">{auction.title}</h4>
                  <p className="font-syne mb-5">{auction.seller}</p>
                  <a className="underline hover:text-gray-500 tracking-widest cursor-pointer">
                    VIEW LOTS
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-12 lg:col-span-3 mx-auto justify-center">
            <h3 className="text-2xl border-b-2 mr-10 pb-3 truncate">
              Upcoming Items{" "}
              <span className="text-gray-400">({upcomingItems.length})</span>
            </h3>
            {pastOrLiveItems.map((item) => (
              <div className="grid grid-cols-12 gap-5 pt-5" key={item.id}>
                <div className="col-span-12 md:col-span-4 h-64 md:h-auto">
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="h-full object-cover"
                  />
                </div>
                <div className="col-span-12 md:col-span-8">
                  <h4 className="text-xl mb-5 truncate">{item.title}</h4>
                  <p className="font-syne mb-5">{item.artistOrMaker}</p>
                  <a className="underline hover:text-gray-500 tracking-widest cursor-pointer">
                    VIEW LOTS
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-12 lg:col-span-3 mx-auto justify-center">
            <h3 className="text-2xl border-b-2 mr-10 pb-3 truncate">
              Past/Live Items{" "}
              <span className="text-gray-400">({pastOrLiveItems.length})</span>
            </h3>
            {upcomingItems.map((item) => (
              <div className="grid grid-cols-12 gap-5 pt-5" key={item.id}>
                <div className="col-span-12 md:col-span-4 h-64 md:h-auto">
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="h-full object-cover"
                  />
                </div>
                <div className="col-span-12 md:col-span-8">
                  <h4 className="text-xl mb-5 truncate">{item.title}</h4>
                  <p className="font-syne mb-5">{item.artistOrMaker}</p>
                  <a className="underline hover:text-gray-500 tracking-widest cursor-pointer">
                    VIEW LOTS
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
