import { fetchWrapper } from "@/lib/fetchWrapper"

export async function addImage(file, id, imageType) {
    let formData = new FormData();
    formData.append('image', file);
    formData.append('imageType', imageType); 

    return fetchWrapper.postImg(`images/upload/auction/${id}`, formData);
}


export async function addItemImages(files, id) {
    let formData = new FormData();
  
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }
  
    return fetchWrapper.postImg(`images/upload/item/${id}`, formData);
  }