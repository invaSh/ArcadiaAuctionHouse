import React from "react";
import { getDetailedView } from "@/app/actions/auctionActions";
import Link from "next/link";

async function Details({ params }) {
  const auction = await getDetailedView(params.id);

  return (
    <div className="container mx-auto px-4 py-8 font-syne">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-3xl leading-6 font-medium text-gray-900">
            {auction.title}
          </h2>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Seller</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {auction.seller}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Starts</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {new Date(auction.auctionStart).toLocaleString()}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Ends</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {new Date(auction.auctionEnd).toLocaleString()}
              </dd>
            </div>
            <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {auction.description}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Thumbnail</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <img
                  src={auction.imageUrl}
                  alt={`Image of ${auction.title}`}
                  className="w-full sm:max-w-xs"
                />
              </dd>
            </div>
            <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {auction.status === 0
                  ? "Live"
                  : auction.status === 1
                  ? "Finished"
                  : auction.status === 2
                  ? "Hasn't started"
                  : "Not specified"}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500"># of items</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {auction.items.length}
                <span className="ml-12 mt-12 text-hover">
                  <a href={`/admin/auctions/items-list/${auction.id}`}>
                    View Auctions
                  </a>
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-8">
        <Link
          href={`/admin/auctions/edit/${params.id}`}
          className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Edit Auction
        </Link>
        <Link
          href={`/admin/items/create/${params.id}/${auction.title}`}
          className="bg-gray-500 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded"
        >
          Add Items to Auction
        </Link>
      </div>
    </div>
  );
}

export default Details;
