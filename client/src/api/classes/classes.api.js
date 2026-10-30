import axios from "axios";
import { axiosInstance } from "../axiosInstance";


//* Fetch all approved classes from the database
export const getAllApprovedClasses = async () => {
  try {
    const res = await axios.get('/approve-class');
    return res.data;
  } catch (error) {
    console.error("Error fetching approved classes:", error);
    throw error;
  }
};

//* Delete a class to database
export const deleteAClass = async (id) => {
  try {
    const res = await axiosInstance.delete(`/delete-class/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting class:", error);
    throw error;
  }
};
