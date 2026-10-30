import { Helmet } from "react-helmet-async";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { useTheme } from "../../providers/ThemeProvider";
import {
  deleteAUser,
  makeUserAdmin,
  makeUserInstructor,
} from "../../api/users/admin.api";
import { useGetAllUsers } from "../../hooks/useFetchUsers";

const ManageUsers = () => {
  const { theme } = useTheme(); //* for using light and dark themes
  const [users, refetch] = useGetAllUsers();
  //* filter out delete users
  const avabileUsers = users?.data?.filter((user) => !user.isDeleted);

  const handleMakeAdmin = async (user) => {
    try {
      const res = await makeUserAdmin(user._id);

      res?.data?.modifiedCount && toast.success("Make admin successfully!");
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleMakeInstructor = async (user) => {
    try {
      const res = await makeUserInstructor(user._id);

      res?.data?.modifiedCount &&
        toast.success("Make instructor successfully!");
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteAUser = async (userId) => {
    try {
      const res = await deleteAUser(userId);

      res?.data?.modifiedCount && toast.success("User deleted successfully");
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (users && users?.data?.length === 0) {
    return (
      <div className="h-[94vh] w-[100%] flex items-center justify-center">
        <p className="text-sm text-red-500 font-medium">
          Here users not found !
        </p>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <Helmet>
        <title>Artistry Academia | Manage Users</title>
      </Helmet>
      {users?.data?.length > 0 && (
        <div className="overflow-x-auto">
          <table
            className={`table ${
              theme.mode === "dark" ? "text-gray-100" : "text-gray-800"
            }`}
          >
            <thead
              className={`${
                theme.mode === "dark" ? "text-gray-100" : "text-gray-800"
              }`}
            >
              <tr>
                <th>SL</th>
                <th>User Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th className="text-center">Action</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                avabileUsers &&
                avabileUsers?.map((user, index) => (
                  <tr key={user._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={user?.image} alt="User Image" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{user?.name}</td>
                    <td>{user?.email}</td>
                    <td>
                      {user.role === "admin"
                        ? "Admin"
                        : user.role === "instructor"
                        ? "Instructor"
                        : "Student"}
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="btn btn-xs btn-color"
                          disabled={user.role === "admin"}
                        >
                          Admin
                        </button>
                        <button
                          onClick={() => handleMakeInstructor(user)}
                          className="btn btn-xs btn-color"
                          disabled={user.role === "instructor"}
                        >
                          Instructor
                        </button>
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteAUser(user._id)}
                        disabled={user.role === "admin"}
                        className={`${
                          user.role === "admin" ? "text-gray-300" : "text-color"
                        }`}
                      >
                        <RiDeleteBin6Line className=" w-6 h-5 mx-auto" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ManageUsers;
