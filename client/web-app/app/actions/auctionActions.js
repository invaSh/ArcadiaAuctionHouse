import { fetchWrapper } from "@/lib/fetchWrapper";



export async function createAuction(data){
    return await fetchWrapper.post("auctions", data)
}

export async function getDetailedView(id){
    return await fetchWrapper.get(`auctions/${id}`);
}