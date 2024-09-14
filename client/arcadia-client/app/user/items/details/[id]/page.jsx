import { getDetailedView } from "@/app/actions/itemActions";
import React from "react";
import PlaceBidForm from "@/app/components/items/PlaceBidForm";
import { getHighestBid } from "@/app/actions/bidActions";
import { getSession } from "@/app/actions/authActions";
import ImageGalleryModal from "@/app/components/ImageGalleryModal";
import { incrementViewCount } from "@/app/actions/dashboardActions";

async function Details({ params }) {
  const item = await getDetailedView(params.id);
  const bid = await getHighestBid(params.id);
  const user = await getSession();
  const today = new Date();
  const itemImageUrls = item.imageUrls;
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  await incrementViewCount(params.id);

  return (
    <>
      {!user ? (
        <div className="text-center mt-12 text-3xl">
          You need to be logged in to view this item.
        </div>
      ) : (
        <div
          style={{ paddingTop: "100px" }}
          className="grid grid-cols-12 p-10 gap-6"
        >
          <div className="col-span-2">
            <h1 className="text-2xl w-full border-b border-gray-300 font-thin text-gray-600 tracking-wide">
              {formattedDate}
            </h1>
            <div className="w-full grid grid-cols-2 gap-3 py-12">
              <ImageGalleryModal imageUrls={itemImageUrls} />
            </div>
          </div>
          <div className="col-span-4">
            <h1 className="text-2xl w-full border-b border-gray-300 font-thin text-gray-600 tracking-wide">
              {item.title}
            </h1>
            <div className="w-100 py-12">
              <img src={item.imageUrl} alt="" />
            </div>
          </div>
          <div className="col-span-5">
            <h1 className="text-2xl w-full border-b border-gray-300 font-thin text-gray-600 tracking-wide">
              Information
            </h1>
            <div className="mt-5 font-syne border-b border-gray-300 pb-10">
              <div className="my-10 text-lg tracking-wider">
                <p>
                  <span className="font-bold">Artist or Maker: </span>
                  {"   "}
                  {item.artistOrMaker}
                </p>
                <p>
                  <span className="font-bold">Title: </span> {item.title}
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-base">
                  <span className="font-bold">Year of Creation: </span>
                  {item.yearOfCreation}
                </p>
                <p className="text-base">
                  <span className="font-bold">Dimensions: </span>
                  {item.dimensions}
                </p>
                <p className="text-base">
                  <span className="font-bold">Materials: </span>
                  {item.materials}
                </p>
                <p className="text-base">
                  <span className="font-bold">Provenance : </span>
                  {item.provenance}
                </p>
                <p className="text-base">
                  <span className="font-bold">Reserve price: </span>
                  {item.reservePrice}
                </p>
                <p className="text-base">
                  <span className="font-bold">Condition report: </span>
                  {item.conditionReport}
                </p>
                <p className="text-base whitespace-pre-line">
                  <span className="font-bold">Description: </span>
                  {item.description}
                </p>
              </div>
            </div>
            <div className="border-b border-gray-300 py-10 text-center">
              <div className="flex justify-center gap-5">
                <p>
                  starting bid: $
                  {item.reservePrice ? item.reservePrice : `1000`}
                </p>
                <p>
                  current highest bid: $
                  {item.currentHighBid ? item.currentHighBid : `0`}
                </p>
              </div>
              <PlaceBidForm item={item} id={params.id} />
            </div>
            <div className="border-b border-gray-300 py-10 text-center">
              {bid.error ? (
                <span>{bid.error.message}</span>
              ) : (
                <span>
                  Your current Bid:{" "}
                  <span className="ml-5 border p-5 shadow-md">
                    ${bid.amount}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Details;
