import { fetchWrapper } from "@/lib/fetchWrapper";

export async function getItems() {
  return await fetchWrapper.get("items");
}

export async function getDetailedView(id) {
  return await fetchWrapper.get(`items/${id}`);
}

export async function createItems(data) {
  return await fetchWrapper.post("items", data);
}

export async function editItems(data) {
  return await fetchWrapper.put(`items/${data.id}`, data);
}

export async function getPaginatedItems(page) {
  const allItems = await fetchWrapper.get("items");
  const pageSize = 7;
  const pageNumber = page || 1;
  const startIndex = (pageNumber - 1) * pageSize;
  const paginatedItems = allItems.items.slice(
    startIndex,
    startIndex + pageSize
  );

  return {
    paginatedItems,
    totalPages: Math.ceil(allItems.items.length / pageSize),
    currentPage: pageNumber,
  };
}
