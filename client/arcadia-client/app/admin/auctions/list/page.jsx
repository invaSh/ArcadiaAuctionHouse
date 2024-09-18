import React from "react";
import {
  getPaginatedAuctions,
} from "@/app/actions/auctionActions";
import Table from "@/app/components/admin/Table";
import Pagination from "@/app/components/admin/Pagination";

export default async function List({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const { paginatedAuctions, totalPages, currentPage } = await getPaginatedAuctions(page);
  const head = ["ID", "Title", "Seller", "Date Created", ""];

  

  return (
    <div className="mt-12 font-syne">
      <h1 className="text-center text-5xl font-syne text-gray-500 ">
        AUCTIONS
      </h1>
      <Table
        head={head}
        data={paginatedAuctions}
        link={`/admin/auctions/details/`}
      />
      <div className="my-12">
        <Pagination totalPages={totalPages} currentPage={currentPage}/>
      </div>
    </div>
  );
}
