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
