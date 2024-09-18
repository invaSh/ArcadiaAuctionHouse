import { fetchWrapper } from "@/lib/fetchWrapper";


export async function placeBid (data){
    return fetchWrapper.post("bids", data)
}

export async function getBids(id){
    return fetchWrapper.get(`bids/${id}`)
}

export async function getAllBids(){
    return fetchWrapper.get("bids")
}

export async function getHighestBid(id){
    return fetchWrapper.get(`bids/highest/${id}`)
}

export async function getWeeklyBids(){
    return fetchWrapper.get(`bids/weekly`)
}

export async function getPaginatedBids(page) {
    const bids = await fetchWrapper.get("bids");
    const pageSize = 10;
    const pageNumber = page || 1;
    const startIndex = (pageNumber - 1) * pageSize;
    const paginatedBids = bids.slice(
      startIndex,
      startIndex + pageSize
    );
  
    return{
      paginatedBids,
      totalPages: Math.ceil(bids.length / pageSize),
      currentPage: pageNumber
    }
  }
  
