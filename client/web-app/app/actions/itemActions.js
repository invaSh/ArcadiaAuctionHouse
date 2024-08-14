import { fetchWrapper } from "@/lib/fetchWrapper";


export async function getItems(){
    return await fetchWrapper.get("items");
}

export async function getDetailedView(id){
    return await fetchWrapper.get(`items/${id}`);
}