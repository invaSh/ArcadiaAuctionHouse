import React from 'react'

function AuctionBanner() {
  return (
    <div 
        className="h-[80vh] p-12"
        style={{ 
            backgroundImage: "url('https://www.ragoarts.com/files/home/media/A24088_025_6c08a7a95955b6f6280a409bd530eedbb0f79961.jpg?t=1722021790?size=1440')", 
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed"
        }}
        >
      <div className="text-center px-10 grid gap-10 text-gray-100 text-shadow">
        <h4 className="text-base">ARCADIA | JEWEL</h4>
        <h1 className="text-6xl">09.08.2024</h1>
        <h1 className="text-6xl">21ST CENTURY ART</h1>
        <ul className="text-lg flex justify-center underline underline-offset-4">
            <li className="tracking-widest text-hover cursor-pointer rounded-md px-3">INFORMATION</li>
            <li className="tracking-widest text-hover cursor-pointer rounded-md px-3">VIEW LOTS</li>
            <li className="tracking-widest text-hover cursor-pointer rounded-md px-3">REGISTER TO BID</li>
        </ul>
      </div>
    </div>
  )
}

export default AuctionBanner
