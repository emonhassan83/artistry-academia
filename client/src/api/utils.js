import { axiosInstance } from "./axiosInstance"

//* upload image in Imgbb
export const imageUpload = async image => {
    const formData = new FormData()
    formData.append('image', image)
    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_KEY
    }`
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    return data
  }

//* Get a user role from the database
export const getRole = async (email) => {
  const res = await axiosInstance.get(`/users/${email}`);
  const user = await res?.data?.data;
  return user?.role;
};