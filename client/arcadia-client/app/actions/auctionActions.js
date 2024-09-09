import { fetchWrapper } from "@/lib/fetchWrapper";


export async function createAuction(data){
    return await fetchWrapper.post("auctions", data)
}
export async function editAuction(data){
    return await fetchWrapper.put(`auctions/${data.id}`, data)
}

export async function getDetailedView(id){
    return await fetchWrapper.get(`auctions/${id}`);
}

export async function getAllAuctions(){
    return await fetchWrapper.get("auctions")
}

export async function getUpcomingAuctions(){
    return await fetchWrapper.get("auctions/upcoming")
}

export async function updateBanner(id, auctionId) {
    const body = { auctionId };
  
    return await fetchWrapper.put(`auctions/update-banner/${id}`, body);
  }


  export async function getAllBanners(){
    return await fetchWrapper.get("auctions/update-banner")
}
