import AuctionBanner from "./components/auctions/AuctionBanner";
import StoryCard from "./components/blogs/StoryCard";
import Browse from "./components/auctions/Browse";
import { getUpcomingAuctions, getAllAuctions, getAllBanners, getDetailedView } from "./actions/auctionActions";
import AuctionCard from "./components/auctions/AuctionCard";
import LiveAuctionCard from "./components/auctions/LiveAuctionCard";
import RegisterBanner from "./components/RegisterBanner";

export default async function Home() {
  let upcomingAuctions = await getUpcomingAuctions();
  console.log("===>", upcomingAuctions);
  
  upcomingAuctions = upcomingAuctions.slice(0, 5);

  const auctions = (await getAllAuctions()).auctions;
  const liveAuctions = auctions.filter(auction => auction.status === 0);

  const banners = await getAllBanners();
  

  const auction1 = await getDetailedView(banners[0].auctionId);
  const auction2 = await getDetailedView(banners[1].auctionId);
  const auction3 = await getDetailedView(banners[2].auctionId);

  return (
    <div>
      <AuctionBanner auction={auction1}/>

      <div className="grid grid-cols-12 p-10 justify-center gap-10 my-10">
        <StoryCard />
        <StoryCard />
        <StoryCard />
      </div>

      <div className="grid grid-cols-12 gap-10 px-10 my-12">
        <Browse
          subtitle={"FIND WHAT YOU LOVE"}
          title={"Browse all art and items"}
          redirectLink="/user/auctions"
        />
        <Browse
          subtitle={"STORIES TO KNOW"}
          title={"Read recent news and stories"}
          redirectLink="/user/auctions"
        />
      </div>

      <AuctionBanner auction={auction2}/>

      <div className="p-4 m-12">
        <h2 className="text-center text-6xl tracking-widest my-10 font-thin py-10">
          Upcoming Auctions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {upcomingAuctions.length > 0 ? (
            upcomingAuctions.map((auction, index) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))
          ) : (
            <div>No auctions available</div>
          )}
        </div>
      </div>

      <AuctionBanner auction={auction3}/>

      <div className="p-4 mb-10 w-full">
        <h1 className="text-center mb-10 text-6xl tracking-widest my-10 font-thin py-10">
          Live Auctions
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {liveAuctions.slice(0, 2).map((auction) => (
            <LiveAuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      </div>

      <RegisterBanner />
    </div>
  );
}
