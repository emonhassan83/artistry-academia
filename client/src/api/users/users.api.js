import { axiosInstance } from "../axiosInstance";
import { api } from "../baseApi";

//* save a user to database
export const saveUser = async (user) => {
  const currentUser = {
    name: user?.name || "unknown",
    email: user.email,
    image: user?.image,
    role: "student",
    isDeleted: false,
    createdAt: new Date().toISOString(),
  };

  try {
    const res = await api.put(`/users/${user?.email}`, currentUser);
    const data = res.data;
    console.log(data);
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }
};

//* save a user to database by social account
export const saveUserBySocial = async (user) => {
  const currentUser = {
    name: user?.displayName || "unknown",
    email: user.email,
    image: user?.photoUrl,
    role: "student",
    isDeleted: false,
    createdAt: new Date().toISOString(),
  };

  try {
    const res = await api.put(`/users/${user?.email}`, currentUser);
    const data = res.data;
    console.log(data);
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }
};

//* Get all users from the database
export const fetchAllUsers = async () => {
  try {
    const res = await axiosInstance.get(`/users`);
    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

//* Get a user by Id from the database
export const getUserById = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

//* Fetch a user by email from the database
export const fetchUserByEmail = async (email) => {
  try {
    const response = await axiosInstance.get(`/users/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
};

//* update a user from the database
export const updateUser = async (userData) => {
  try {
    const response = await axiosInstance.put(
      `/users/${userData?.email}`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
