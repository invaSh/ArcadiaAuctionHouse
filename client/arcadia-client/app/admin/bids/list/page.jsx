import React from "react";
import { getAllBids, getPaginatedBids } from "@/app/actions/bidActions";
import Table from "@/app/components/admin/BidsTable";
import Pagination from "@/app/components/admin/Pagination";

export default async function List({ searchParams }) {
  const bids = await getAllBids();
  const page = parseInt(searchParams.page) || 1;
  const { paginatedBids, totalPages, currentPage } = await getPaginatedBids(
    page
  );

  const head = [
    "Bidder",
    "Item Id",
    "Bid Amount",
    "Item Status",
    "Item details",
  ];
  console.log(bids);

  return (
    <div>
      <h2 className="text-center mt-12 text-3xl text-gray-800">All Bids</h2>
      <Table head={head} data={paginatedBids} link={`/admin/items/details`} />
      <div className="my-12">
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}
