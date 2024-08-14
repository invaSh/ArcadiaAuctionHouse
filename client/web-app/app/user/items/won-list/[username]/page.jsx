import React from "react";
import WinnerCard from "@/app/components/auctions/WinnerCard";
import { getItems } from "@/app/actions/itemActions";

async function Won({ params }) {
  const data = await getItems();
  const currentUser = params.username;
  const wonItems = data.items.filter((item) => item.winner === currentUser);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-5xl font-thin text-center mb-6">
        Items you have won ({wonItems.length})
      </h1>

      <div>
        {wonItems.length > 0 ? (
          wonItems.map((item) => <WinnerCard key={item.id} item={item} />)
        ) : (
          <h3 className="text-center text-xl mt-12">
            You have not won any items...
          </h3>
        )}
      </div>
    </div>
  );
}

export default Won;
