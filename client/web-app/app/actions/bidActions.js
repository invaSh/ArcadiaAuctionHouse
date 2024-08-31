import { fetchWrapper } from "@/lib/fetchWrapper";


export async function placeBid (data){
    return fetchWrapper.post("bids", data)
}

export async function getBids(id){
    return fetchWrapper.get(`bids/${id}`)
}

export async function getHighestBid(id){
    return fetchWrapper.get(`bids/highest/${id}`)
}

