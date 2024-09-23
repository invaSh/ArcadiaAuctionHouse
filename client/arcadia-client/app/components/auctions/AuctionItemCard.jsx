import React from "react";
import Link from "next/link";
function AuctionItemCard({ index, item }) {
  return (
    <div className="w-[19%] text-center mb-10 cursor-pointer">
      <img src={item.imageUrl} className="img-hover" alt="" />
      <div className="mt-5 text-hover">
        <Link href={`/user/items/details/${item.id}`}>
          <h4 className="truncate">
            <span className="text-gray-500 text-3xl mr-3">{index + 1}</span>{" "}
            <span className="font-syne text-xl uppercase font-bold truncate">
              {item.title}
            </span>
          </h4>
          <p className="font-thin text-gray-500">{item.artistOrMaker}</p>
          <p className="font-thin text-gray-500 truncate">
            reserve price - ${item.reservePrice}10,000
          </p>
          <p className="truncate">
            {item.currentHighBid ? (
              <>
                <span className="font-thin text-gray-500">current bid: </span>
                <span className="font-bold">${item.currentHighBid}</span>
              </>
            ) : (
              `no bids have been placed`
            )}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default AuctionItemCard;
