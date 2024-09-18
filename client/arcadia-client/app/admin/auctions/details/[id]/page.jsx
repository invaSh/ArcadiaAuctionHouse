import React from "react";
import { getDetailedView } from "@/app/actions/auctionActions";
import Link from "next/link";
import DeleteButton from "@/app/components/admin/DeleteButton";

async function Details({ params }) {
  const auction = await getDetailedView(params.id);

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
              <dt className="text-sm font-medium text-gray-500">
                Thumbnail & Banner
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex gap-3">
                <img
                  src={auction.imageUrl}
                  alt={`Image of ${auction.title}`}
                  className="w-full sm:max-w-xs"
                />
                <img
                  src={auction.bannerUrl}
                  alt={`Image of ${auction.title}`}
                  className="w-full sm:max-w-xs object-cover"
                />
              </dd>
            </div>
            <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
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
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500"># of items</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {auction.items.length}
                <span className="ml-12 text-hover">
                  <a href={`/admin/auctions/items-list/${auction.id}`}>
                    <u>View Items</u>
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
      <div className="flex justify-center space-x-4 mt-8">
        <DeleteButton
          id={params.id}
          entityName="Auction"
          redirectUrl="/admin/auctions/list"
        />
      </div>
    </div>
  );
}

export default Details;
