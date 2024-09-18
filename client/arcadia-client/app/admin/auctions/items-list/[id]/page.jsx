import React from "react";
import { getDetailedView } from "@/app/actions/auctionActions";
import Link from "next/link";

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
                className="w-full h-32 object-cover mt-2 mb-5 rounded"
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
              <p className="text-sm text-gray-500">
                Provenance: {item.provenance}
              </p>
              <p className="text-sm mt-2 text-hover">
                <Link href={`/admin/items/details/${item.id}`}>
                <u>View Details</u>
                </Link>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No items found in this auction.</p>
      )}
    </div>
  );
}
