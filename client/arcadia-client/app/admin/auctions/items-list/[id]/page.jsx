import React from "react";
import { getDetailedView } from "@/app/actions/auctionActions";

export default async function ItemsList({ params }) {
  const auction = await getDetailedView(params.id);
  const items = auction.items || [];

  return (
    <div className="container mx-auto px-4 py-12 my-12">
      <h1 className="text-2xl font-bold mb-12 text-center">
        Items for Auction "{auction.title}"
      </h1>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {items.map((item, index) => (
            <div key={index} className="border rounded-lg shadow-md p-4">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-32 object-cover mt-2 rounded"
              />
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <div className="truncate-container">
                <p className="text-gray-600 truncate-text">
                  {item.description}
                </p>
              </div>
              <p className="text-sm text-gray-500">
                Dimensions: {item.dimensions}
              </p>
              <p className="text-sm text-gray-500">
                Materials: {item.materials}
              </p>
              <p className="text-sm text-gray-500">
                Year of Creation: {item.yearOfCreation}
              </p>
              <p className="text-sm text-gray-500">
                Artist or Maker: {item.artistOrMaker}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Provenance: {item.provenance}
              </p>
              <div className="mt-4 flex space-x-2">
                {/* Button for removing the item from auction */}
                <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">
                  Remove from Auction
                </button>
                {/* Button for hiding the item */}
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded">
                  Hide
                </button>
                {/* Button for deleting the item */}
                <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No items found in this auction.</p>
      )}
    </div>
  );
}
