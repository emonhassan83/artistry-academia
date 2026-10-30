import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../api/axiosInstance";

export const useInstructor = () => {
  const { user } = useContext(AuthContext);

  const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
    queryKey: ["instructor", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/instructor/${user?.email}`);
      return res.data.instructor;
    },
  });

  return [isInstructor, isInstructorLoading];
};

//* get all instructors from database
export const usePopularInstructors = () => {
  const { data: instructors, isLoading, refetch } = useQuery({
    queryKey: ["instructor"],
    queryFn: async () => {
      const res = await axiosInstance.get('instructors');
      return res.data;
    },
  });

  return [instructors, isLoading, refetch];
};

//* get instructor bio by instructorId
export const useInstructorById = ({id}) => {
  const { data: instructorBio, isLoading: isInstructorBioLoading } = useQuery({
    queryKey: ["instructorBio"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/get-instructor-bio/${id}`);
      return res.data;
    },
  });

  return [instructorBio, isInstructorBioLoading];
};