import axios from 'axios'

export const imgUploader = async (imgData) => {
    const formData = new FormData();
    formData.append("image", imgData);
    const imgUploadApiKey = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_BB_Key}`
    const data = await axios.post(imgUploadApiKey, formData)
    return data.data.data.url;
}