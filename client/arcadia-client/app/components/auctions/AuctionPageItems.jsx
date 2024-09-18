"use client";
import React, { useState } from "react";
import AuctionItemCard from "@/app/components/auctions/AuctionItemCard";

function Items({ items }) {
  const [sortedItems, setSortedItems] = useState([...items]);

  function handleSorting(event) {
    const option = event.target.value;
    let sortedArray = [...sortedItems]; 

    if (option === "title") {
      sortedArray.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === "artistOrMaker") {
      sortedArray.sort((a, b) => a.artistOrMaker.localeCompare(b.artistOrMaker));
    } else if (option === "yearOfCreation") {
      sortedArray.sort((a, b) => a.yearOfCreation - b.yearOfCreation);
    }

    setSortedItems(sortedArray);
    console.log("Items sorted:", sortedItems);
  }

  return (
    <>
      <div className="w-[75%] mx-auto flex justify-end gap-5 mt-12">
        <select
          id="large"
          className="block px-4 py-3 border text-base w-60"
          onChange={handleSorting}
        >
          <option className="custom-option" value="" disabled>
            Sort by:
          </option>
          <option className="custom-option" value="title">
            Title
          </option>
          <option className="custom-option" value="artistOrMaker">
            Artist Or Maker
          </option>
          <option className="custom-option" value="yearOfCreation">
            Year Of Creation
          </option>
        </select>
      </div>
      <div className="flex flex-wrap gap-5 mt-8 px-5">
        {sortedItems.length > 0 ? (
          sortedItems.map((item, index) => (
            <AuctionItemCard index={index} key={item.id} item={item} />
          ))
        ) : (
          <div className="col-span-12 text-center py-10">
            <p>No items available for this auction.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Items;
