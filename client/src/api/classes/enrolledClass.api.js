import { axiosInstance } from "../axiosInstance";

//* Get all enrolled classes from the database
export const getAllEnrolledClasses = async () => {
    try {
      const res = await axiosInstance.get("/all-enroll-class");
      return res.data;
    } catch (error) {
      console.error("Error fetching all enrolled classes:", error);
      throw error;
    }
  };

//* Get all enrollments of a student by email
export const getEnrolledClassesByEmail = async (email) => {
    try {
      const res = await axiosInstance.get("/enroll-class", {
        params: { email: email },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching enrolled classes:", error);
      throw error;
    }
  };
