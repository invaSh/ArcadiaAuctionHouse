import React from 'react'
import AuctionForm from '@/app/components/auctions/AuctionForm'
export default function Create() {
  return (
    <div className="m-auto mt-12 max-w-[75%] shadow-lg p-10 bg-white rounded-lg`">
      <h1 className="my-5 text-4xl font-thin font-syne">Add new auction</h1>
      <AuctionForm/>
    </div>
  )
}
