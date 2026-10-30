import { axiosInstance } from "../axiosInstance";

//* Fetch all classes from the database
export const getAllClasses = async () => {
  try {
    const res = await axiosInstance.get("/classes");
    return res.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};

//* Approve a class by admin
export const approveClassByAdmin = async (classId) => {
  try {
    const res = await axiosInstance.patch(`/classes/approved/${classId}`);
    return res.data;
  } catch (error) {
    console.error("Error approving class by admin:", error);
    throw error;
  }
};

//* Deny a class by admin
export const denyClassByAdmin = async (classId) => {
  try {
    const res = await axiosInstance.patch(`/classes/deny/${classId}`);
    return res.data;
  } catch (error) {
    console.error("Error denying class by admin:", error);
    throw error;
  }
};

//* Give feedback a class by admin by feedback massage
export const feedbackAClass = async (feedbackData) => {
  try {
    const res = await axiosInstance.patch(
      `/class/${feedbackData?.id}`,
      feedbackData?.feedback
    );
    return res.data;
  } catch (error) {
    console.error("Error giving feedback:", error);
    throw error;
  }
};

//* Delete a class from the database
export const deleteAClass = async (id) => {
  try {
    const res = await axiosInstance.delete(`/delete-class/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting class:", error);
    throw error;
  }
};
