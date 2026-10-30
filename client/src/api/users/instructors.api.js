import { api } from "../baseApi";

//* Get all instructors from database
export const getAllInstructors = async () => {
  try {
    const res = await api.get("/instructors");
    return res.data;
  } catch (error) {
    console.error("Error fetching instructors:", error);
    throw error;
  }
};