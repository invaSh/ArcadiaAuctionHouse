import { fetchWrapper } from "@/lib/fetchWrapper";


export async function incrementViewCount(id){
    return await fetchWrapper.post(`dashboard/viewcount/${id}`, "")
}

export async function getViews(){
    return await fetchWrapper.get("dashboard/clicks")
}
export async function getRevenues(){
    return await fetchWrapper.get("dashboard/revenue")
}

export async function getNotifs(){
    return await fetchWrapper.get("notifs")
}

export async function viewedSet(id){
    return await fetchWrapper.get(`notifs/${id}`)
}

