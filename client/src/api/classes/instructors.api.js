import { axiosInstance } from "../axiosInstance";

//* Add a course in Database
export const addClass = async (classData) => {
  try {
    const res = await axiosInstance.post("/class", classData);
    return res.data;
  } catch (error) {
    console.error("Error adding class:", error);
    throw error;
  }
};

//* Fetch all classes by instructor email
export const getClassesByInstructorEmail = async (email) => {
  try {
    const res = await axiosInstance.get("/my-class", {
      params: { email: email },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching classes by instructor email:", error);
    throw error;
  }
};

//* Update a course by Instructor
export const updateAClass = async (updateData, id) => {
  try {
    const res = await axiosInstance.patch(`/update-class/${id}`, updateData);
    return res.data;
  } catch (error) {
    console.error("Error updating class:", error);
    throw error;
  }
};
