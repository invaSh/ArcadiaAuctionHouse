import React from "react";
import { getAllAuctions } from "@/app/actions/auctionActions";
import Table from "@/app/components/admin/Table";

export default async function List() {
  const data = await getAllAuctions();
  const head = ["ID","Title", "Seller", "Date Created", ""];

  return (
    <div className="mt-12 font-syne">
      <h1 className="text-center text-5xl font-syne text-gray-500 ">AUCTIONS</h1>
      <Table head={head} data={data.auctions} link={`/admin/auctions/details/`}/>
    </div>
  );
}
