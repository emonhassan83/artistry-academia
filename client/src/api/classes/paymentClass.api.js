import { axiosInstance } from "../axiosInstance";

//* Save payment class data to the database
export const savePaymentClass = async (classData) => {
    try {
      const res = await axiosInstance.post("/payment-class", classData);
      return res.data;
    } catch (error) {
      console.error("Error saving payment class:", error);
      throw error;
    }
  };