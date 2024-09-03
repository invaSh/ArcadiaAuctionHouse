import React from "react";
import ItemTable from "@/app/components/admin/ItemTable"; 
import { getItems } from "@/app/actions/itemActions";

export default async function ItemList() {
  const head = ["ID", "Title", "Artist or Maker", "Year of Creation", "Actions"];
  const link = "/admin/items/details/";

    const items = (await getItems()).items;

  return (
    <div className="mt-12">
      <h1 className="text-center text-5xl">ITEMS</h1>
      <ItemTable data={items} head={head} link={link} />
    </div>
  );
}
