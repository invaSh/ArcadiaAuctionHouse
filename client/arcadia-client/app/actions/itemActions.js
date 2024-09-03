import { fetchWrapper } from "@/lib/fetchWrapper";


export async function getItems(){
    return await fetchWrapper.get("items");
}

export async function getDetailedView(id){
    return await fetchWrapper.get(`items/${id}`);
}

export async function createItems(data){
    return await fetchWrapper.post("items", data)
}

export async function editItems(data){
    return await fetchWrapper.put(`items/${data.id}`, data)
}

