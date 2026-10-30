import { Helmet } from "react-helmet-async";
import ManageClassRow from "../../components/Dashboard/ManageClassRow";
import { useTheme } from "../../providers/ThemeProvider";
import { useGetAllClasses } from "../../hooks/useClass";
import toast from "react-hot-toast";
import {
  approveClassByAdmin,
  denyClassByAdmin,
} from "../../api/classes/admin.api";

const ManageClass = () => {
  const { classes, refetch } = useGetAllClasses();
  const { theme } = useTheme(); //* for using light and dark themes
  //* filter out delete classes
  const avabileClasses = classes?.data?.filter(
    (classData) => !classData.isDeleted
  );

  const handleMakeApprove = async (classId) => {
    try {
      const res = await approveClassByAdmin(classId);

      res?.data?.modifiedCount > 0 &&
        toast.success("Class approve successfully!");
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleMakeDeny = async (classId) => {
    try {
      const res = await denyClassByAdmin(classId);

      res?.data?.modifiedCount > 0 && toast.success("Class deny successfully!");
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (classes && classes?.data?.length === 0) {
    return (
      <div className="h-[94vh] w-[100%] flex items-center justify-center">
        <p className="text-sm text-red-500 font-medium">
          Instructor class not found !
        </p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Artistry Academia | Manage Class</title>
      </Helmet>
      {classes?.data?.length > 0 && (
        <div className="overflow-x-auto">
          <table
            className={`table ${
              theme.mode === "dark" ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {/* head */}
            <thead
              className={`${
                theme.mode === "dark" ? "text-gray-100" : "text-gray-800"
              }`}
            >
              <tr>
                <th>SL</th>
                <th>Class Image</th>
                <th>Class Name</th>
                <th>Instructor Name</th>
                <th> Available seats</th>
                <th>Price</th>
                <th>Status</th>
                <th className="text-center">Action</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {classes?.data &&
                avabileClasses &&
                avabileClasses?.map((classData, index) => (
                  <ManageClassRow
                    key={classData?._id}
                    classData={classData}
                    index={index}
                    handleMakeApprove={handleMakeApprove}
                    handleMakeDeny={handleMakeDeny}
                    refetch={refetch}
                  />
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ManageClass;
