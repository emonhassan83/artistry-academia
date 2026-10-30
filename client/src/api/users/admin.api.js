import { axiosInstance } from "../axiosInstance";

//* Make a user an admin by ID
export const makeUserAdmin = async (id) => {
  try {
    const res = await axiosInstance.patch(`/users/admin/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error making user an admin:", error);
    throw error;
  }
};

//* Make a user an instructor by ID
export const makeUserInstructor = async (id) => {
  try {
    const res = await axiosInstance.patch(`/users/instructor/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error making user an instructor:", error);
    throw error;
  }
};

//* Delete a user to database
export const deleteAUser = async (id) => {
  try {
    const res = await axiosInstance.delete(`/user/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
