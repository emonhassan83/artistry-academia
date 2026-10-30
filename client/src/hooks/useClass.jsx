import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../api/axiosInstance";
import { api } from "../api/baseApi";

//* get instructors own class by email
export const useGetAllClasses = () => {
  const {
    data: classes = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosInstance.get("classes");
      return res.data;
    },
  });

  return { classes, isLoading, refetch };
};

//* get instructors own class by email
export const useClassByEmail = (email) => {
  const {
    data: classes = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["classes", email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/my-class`, {
        params: { email: email },
      });
      return res.data;
    },
  });

  return [classes, isLoading, refetch];
};

//* get all class by email
export const useEnrollClass = () => {
  const { user } = useContext(AuthContext);

  const { data: classes = [] } = useQuery({
    queryKey: ["classes", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/enroll-class?email=${user?.email}`);
      return res.data;
    },
  });

  return [classes];
};

//* get all approved class
export const useApproveClass = () => {
  const {
    data: classes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["approve-class"],
    queryFn: async () => {
      const res = await api.get("approve-class");
      return res.data;
    },
  });

  return [classes, isLoading, refetch];
};

//* Fetch a class from the database
export const useAClasses = (id) => {
  const { data: classes = [], refetch } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/classes/${id}`);
      return res.data;
    },
  });
  return [classes, refetch];
};

//* get all student select class by email
export const useSelectClass = () => {
  const { user } = useContext(AuthContext);

  const { data: classes = [], refetch } = useQuery({
    queryKey: ["classes", user?.email],
    queryFn: async () => {
      if (user) {
        const res = await axiosInstance.get(
          `/selected-class?email=${user?.email}`
        );
        return res.data;
      }
    },
  });
  return [classes, refetch];
};
