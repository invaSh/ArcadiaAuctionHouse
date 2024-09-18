import { fetchWrapper } from "@/lib/fetchWrapper";


export async function createUser (data){
    return await fetchWrapper.post("users", data)

}

export async function getUserDetails (id){
    return await fetchWrapper.get(`users/${id}`)

}
export async function deleteUser (id){
    return await fetchWrapper.del(`users/${id}`)
}

export async function editUser(id, data){
    return await fetchWrapper.put(`users/${id}`, data)
}

export async function getUsers(){
    return await fetchWrapper.get("users");
}


export async function getPaginatedUsers(page) {
    const allAcc = await fetchWrapper.get("users");
    const pageSize = 5;
    const pageNumber = page || 1;
    const startIndex = (pageNumber - 1) * pageSize;
    const paginatedUsers = allAcc.slice(
      startIndex,
      startIndex + pageSize
    );
  
    return{
      paginatedUsers,
      totalPages: Math.ceil(allAcc.length / pageSize),
      currentPage: pageNumber
    }
  }
  

