import { fetchWrapper } from "@/lib/fetchWrapper";


export async function searchMethod(searchTerm){
    return await fetchWrapper.get(`search?searchTerm=${searchTerm}`)
}