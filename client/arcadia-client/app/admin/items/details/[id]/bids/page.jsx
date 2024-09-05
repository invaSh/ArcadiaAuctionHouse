import React from "react";
import { getBids } from "@/app/actions/bidActions";
import { getDetailedView } from "@/app/actions/itemActions";

async function ItemBids({ params }) {
  const itemBids = await getBids(params.id);
  const item = await getDetailedView(params.id);

  function getBidStatusMessage(status) {
    switch (status) {
      case "Accepted":
        return "Accepted";
      case "AcceptedBelowReserve":
        return "Accepted Below Reserve Price";
      case "TooLow":
        return "Bid Too Low";
      case "NoLongerInAuction":
        return "No Longer Available";
      default:
        return "Unknown Status";
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h2 className="text-center my-12 text-2xl text-gray-800">
        Bids for "{item.title}"
      </h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400 rounded-md">
        <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Bidder
            </th>
            <th scope="col" className="px-6 py-3">
              Bid Time
            </th>
            <th scope="col" className="px-6 py-3">
              Bid Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {itemBids.map((bid) => (
            <tr key={bid.id} className="odd:bg-white even:bg-gray-50">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {bid.bidder}
              </th>
              <td className="px-6 py-4 text-gray-900">
                {new Date(bid.bidTime).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-gray-900">${bid.amount}</td>
              <td className="px-6 py-4 text-gray-900">
                {getBidStatusMessage(bid.bidStatus)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemBids;
