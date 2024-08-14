import { getDetailedView } from "@/app/actions/itemActions";
import React from "react";
import BiddingButton from "@/app/components/auctions/Button";
import Select from "@/app/components/Select";

async function Details({ params }) {
  const item = await getDetailedView(params.id);

  const today = new Date();

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  return (
    <div
      style={{ paddingTop: "100px" }}
      className="grid grid-cols-12 p-10 gap-6"
    >
      <div className="col-span-2">
        <h1 className="text-2xl w-full border-b border-gray-300 font-thin text-gray-600 tracking-wide">
          {formattedDate}
        </h1>
        <div className="w-full grid grid-cols-2 gap-3 py-12">
          <img
            className="col-span-1 img-hover"
            src="https://www.wright20.com/items/index/600/114_1_editions_works_on_paper_august_2024_roy_lichtenstein_yellow_still_life_from_the_six_still_lives_series__wright_auction.jpg?t=1722271378"
            alt=""
          />
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
        <div className="border-b border-gray-300 py-10">
          <p>starting bid: ${item.reservePrice}4,000</p>
          <div className="grid grid-cols-2 gap-3 mt-5">
            <Select className="col-span-1" />
            <BiddingButton text={"place bid"} className="col-span-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
