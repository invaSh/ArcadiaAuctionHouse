import React from "react";
import AuctionHero from "@/app/components/auctions/AuctionHero";
import { getDetailedView } from "@/app/actions/auctionActions";
import Items from "@/app/components/auctions/AuctionPageItems";
import Link from "next/link";
import { RiTriangleFill } from "react-icons/ri";

export default async function Info({ params }) {
  const auction = await getDetailedView(params.id);
  const items = auction.items;
  const randomIndex = Math.floor(Math.random() * items.length);
  const randomItem = items[randomIndex];

  return (
    <div className="mb-12">
      <AuctionHero auction={auction} />
      <div className="w-full border-b border-gray-200">
        <div className="text-lg mx-auto w-[75%] flex justify-between px-7 py-3">
          <div className="flex gap-5">
            <Link href={`/user/auctions/info/${params.id}`}>
              <p className="cursor-pointer text-gray-500">INFORMATION</p>
            </Link>
            <Link href={`/user/auctions/details/${params.id}`}>
              <p className="cursor-pointer text-hover">VIEW LOTS</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full h-[75vh] flex flex-col justify-center items-center" style={{ backgroundColor: "#413d49" }}>
        <p
          className="text-3xl text-center text-white w-[50%]"
        >
          {auction.shortDesc}
        </p>
      </div>
      <div className="w-full h-[75vh] flex ">
        <img
          src={`${randomItem.imageUrl}`}
          className="w-1/2 h-full object-cover"
          alt=""
        />
        <div
          style={{ backgroundColor: "#78747c" }}
          className="w-1/2 h-full relative text-white flex flex-col justify-center items-center"
        >
          <RiTriangleFill
            className="absolute text-7xl"
            style={{
              transform: "rotate(-90deg)",
              color: "#78747c",
              top: "60%",
              left: "-50px",
            }}
          />
          <h1 className="text-2xl text-center pt-12 text-hover cursor-pointer">{randomItem.title} <u className="font-playfair"><i> "{randomItem.materials}"</i></u></h1>
            <p className="p-12">
                <i>{randomItem.description}</i>
            </p>
        </div>
      </div>
    </div>
  );
}
