import { fetchWrapper } from "@/lib/fetchWrapper";

export async function createStory(data) {
  return await fetchWrapper.post("stories", data);
}

export async function getStories() {
  return await fetchWrapper.get("stories");
}

export async function getStory(id) {
  return await fetchWrapper.get(`stories/${id}`);
}

export async function deleteSory(id) {
  return await fetchWrapper.del(`stories/${id}`);
}

export async function updateStory(data) {
  return await fetchWrapper.put(`stories/${data.id}`, data);
}

export async function getPaginatedStories(page) {
  const allASt = await fetchWrapper.get("stories");
  const pageSize = 5;
  const pageNumber = page || 1;
  const startIndex = (pageNumber - 1) * pageSize;
  const paginagtedSts = allASt.slice(
    startIndex,
    startIndex + pageSize
  );

  return{
    paginagtedSts,
    totalPages: Math.ceil(allASt.length / pageSize),
    currentPage: pageNumber
  }
}