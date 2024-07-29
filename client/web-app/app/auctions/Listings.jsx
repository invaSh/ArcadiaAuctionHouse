import React from 'react'
import AuctionCard from './AuctionCard';

async function getData(){
  const res = await fetch('http://localhost:6001/auctions')

  if(!res.ok) throw new Error("-----> couldn't fetch data");

  return res.json();
}

async function Listings(){

  const data = await getData();

  console.log(data);
  
  const {auctions} = data;

    return (
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {auctions.map((auction, index) => (
          <AuctionCard key={index} auction={auction} />
        ))}
        </div>
      </div>
    );

}

export default Listings
