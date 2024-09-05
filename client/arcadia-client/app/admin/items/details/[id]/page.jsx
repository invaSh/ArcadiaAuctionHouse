import React from "react";
import { getDetailedView } from "@/app/actions/itemActions";
import { getBids } from "@/app/actions/bidActions";
import { getDetailedView as getAuction } from "@/app/actions/auctionActions";
import Link from "next/link";

async function Details({ params }) {
  const item = await getDetailedView(params.id);
  const bids = await getBids(params.id);
  const auction = await getAuction(item.auctionId);
  function getStatusClass(status) {
    switch (status) {
      case 0:
        return "bg-green-600"; // Green for live auctions
      case 1:
        return "bg-red-600"; // Red for finished auctions
      case 2:
        return "bg-blue-600"; // Blue for upcoming auctions
      default:
        return "bg-gray-600"; // Gray for unspecified or other statuses
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 font-syne">
      <div className="bg-gray-50 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-3xl leading-6 font-medium text-gray-900">
            {item.title}
          </h2>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Dimensions</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.dimensions}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Materials</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.materials}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Condition Report
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.conditionReport}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Artist or Maker
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.artistOrMaker}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Year of Creation
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.yearOfCreation}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Provenance</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.provenance}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.description}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Image</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <img
                  src={item.imageUrl}
                  alt={`Image of ${item.title}`}
                  className="w-full sm:max-w-xs"
                />
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500"># of bids</dt>
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="flex gap-5">
                  <span className="p-2">{bids.length}</span>
                  <span className="bg-gray-50 p-2">Current highest bid: ${item.currentHighBid}</span>
                </div>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Auction status
              </dt>
              <dd
                className={`mt-1 text-xl text-white sm:mt-0 sm:col-span-2 rounded-md`}
              >
                <span
                  className={`rounded-md py-2 px-3 ${getStatusClass(
                    auction.status
                  )}`}
                >
                  {auction.status === 0
                    ? "Live"
                    : auction.status === 1
                    ? "Finished"
                    : auction.status === 2
                    ? "Hasn't started"
                    : "Not specified"}
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-8">
        <Link
          href={`/admin/items/edit/${params.id}`}
          className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Edit Item
        </Link>
        <Link
          href={`/admin/auctions/details/${item.auctionId}`}
          className="bg-gray-500 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded"
        >
          Back to Auction
        </Link>
      </div>
    </div>
  );
}

export default Details;
