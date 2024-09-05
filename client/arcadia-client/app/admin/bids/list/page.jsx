import React from "react";
import { getAllBids } from "@/app/actions/bidActions";
import Table from "@/app/components/admin/BidsTable";

export default async function List() {
  const bids = await getAllBids();
  const head = ["Bidder", "Item Id", "Bid Amount", "Bid Status", ""];
  console.log(bids);

  return (
    <div>
      <h2 className="text-center mt-12 text-3xl text-gray-800">All Bids</h2>
      <Table head={head} data={bids} link={`/admin/items/details`} />
    </div>
  );
}
