import { fetchWrapper } from "@/lib/fetchWrapper";


export async function searchMethod(searchTerm){
    return await fetchWrapper.get(`search?searchTerm=${searchTerm}`)
}

export async function filterItems(id, sortTitle = false, sortArtistOrMaker = false, sortYearOfCreation = false) {
    let queryParams = `?`;
    if (sortTitle) queryParams += `title=true&`;
    if (sortArtistOrMaker) queryParams += `artistOrMaker=true&`;
    if (sortYearOfCreation) queryParams += `yearOfCreation=true&`;

    queryParams = queryParams.slice(0, -1);

    return await fetchWrapper.get(`search/${id}/filter${queryParams}`);
}