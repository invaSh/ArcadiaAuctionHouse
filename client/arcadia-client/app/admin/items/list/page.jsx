import React from "react";
import ItemTable from "@/app/components/admin/ItemTable";
import { getPaginatedItems } from "@/app/actions/itemActions";
import Pagination from "@/app/components/admin/Pagination";

export default async function ItemList({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const { paginatedItems, totalPages, currentPage } =
    await getPaginatedItems(page);

  const head = [
    "ID",
    "Title",
    "Artist or Maker",
    "Year of Creation",
    "Actions",
  ];
  const link = "/admin/items/details/";

  return (
    <div className="mt-12">
      <h1 className="text-center text-5xl">ITEMS</h1>
      <ItemTable data={paginatedItems} head={head} link={link} />
      <div className="my-12">
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}
