import React from 'react'
import Link from 'next/link';

function AuctionBanner(props) {

const auction = props.auction;

  return (
    <div 
        className="h-[80vh] p-12 font-playfair"
        style={{ 
            backgroundImage:`linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.3)), url(${auction.bannerUrl})`, 
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed"
        }}
        >
      <div className="text-center px-10 grid gap-10 text-gray-100 text-shadow">
        <h4 className="text-base">ARCADIA</h4>
        <h1 className="text-6xl"></h1>
        <h1 className="text-6xl font-bold">{auction.title}</h1>
        <ul className="text-lg flex justify-center underline underline-offset-4">
            <li className="tracking-widest text-hover cursor-pointer rounded-md px-3">
              <Link href={`/user/auctions/info/${auction.id}`}>INFORMATION</Link>
            </li>
            <li className="tracking-widest text-hover cursor-pointer rounded-md px-3">
              <Link href={`/user/auctions/details/${auction.id}`}>VIEW LOTS</Link>
            </li>
        </ul>
      </div>
    </div>
  )
}

export default AuctionBanner
