import { getAccessToken } from "@/app/actions/authActions";
const baseUrl = "http://localhost:6001/";

async function get(url){
    const requestOptions ={
        method: "GET",
        headers: await getHeaders()
    }
    const response = await fetch(baseUrl + url, requestOptions);
    
    return await handleResponse(response);
}

async function post(url, body){
    const requestOptions ={
        method: "POST",
        headers: await getHeaders(),
        body: JSON.stringify(body)
    }

    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
}

async function put(url, body){
    const requestOptions ={
        method: "PUT",
        headers: await getHeaders(),
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
}

async function del(url){
    const requestOptions ={
        method: "DELETE",
        headers: await getHeaders(),
    }

    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
}

async function getHeaders() {
    const token = await getAccessToken();
    
    const headers = {"Content-type" : "application/json"};
    if(token){
        headers.Authorization = "Bearer " + token.access_token
    }

    return headers;
}


async function handleResponse(response) {
    const text = await response.text();
  
    let data;
    try {
      data = JSON.parse(text);
    } catch (error) {
      data = text;
    }
  
    if (response.ok) {
      return data; 
    } else {
      const error = {
        status: response.status,
        message: data || response.statusText, 
      };
      return { error };
    }
  }
  

  export const fetchWrapper = {
    get,
    post,
    put,
    del,
  };

