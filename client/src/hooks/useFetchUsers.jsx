import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

//* get all users from the database
export const useGetAllUsers = () => {
 const [axiosSecure] = useAxiosSecure();

  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  return [ users, refetch ];
};

//* get a user from the database
export const useGetAUser = ({id}) => {
 const [axiosSecure] = useAxiosSecure();

  const { data: user = [], refetch } = useQuery(["user", id], async () => {
    const res = await axiosSecure.get(`/user/${id}`);
    return res.data;
  });

  return [ user, refetch ];
};
