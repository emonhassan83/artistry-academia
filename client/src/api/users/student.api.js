import { axiosInstance } from "../axiosInstance";

export const fetchAllStudents = async () => {
    try {
      const res = await axiosInstance.get('/students');
      return res.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  };
  