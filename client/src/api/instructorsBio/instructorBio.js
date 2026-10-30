import { axiosInstance } from "../axiosInstance";

//* Add instructor bio
export const addInstructorBio = async (bioData) => {
  try {
    const res = await axiosInstance.post("/save-instructor-bio", bioData);
    return res.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

//* Get instructor's bio by userId
export const getInstructorBio = async (userId) => {
  try {
    const res = await axiosInstance.get(`/get-instructor-bio/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Error getting instructor bio:", error);
    throw error;
  }
};
