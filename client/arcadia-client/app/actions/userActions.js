import { fetchWrapper } from "@/lib/fetchWrapper";


export async function createUser (data){
    return await fetchWrapper.post("users", data)

}

export async function getUserDetails (id){
    return await fetchWrapper.get(`users/${id}`)

}

export async function editUser(id, data){
    return await fetchWrapper.put(`users/${id}`, data)
}

export async function getUsers(){
    return await fetchWrapper.get("users");
}


