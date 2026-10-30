import SelectedClassRow from "../../components/Dashboard/SelectedClassRow";
import { Helmet } from "react-helmet-async";
import { useTheme } from "../../providers/ThemeProvider";
import { useSelectClass } from "../../hooks/useClass";
import toast from "react-hot-toast";
import { deleteSelectedClass } from "../../api/classes/student.api";

const SelectedClass = () => {
  const [classes, refetch] = useSelectClass();
  const { theme } = useTheme(); //* for using light and dark themes

  const handleDelete = async (classId) => {
    try {
      //* call select class delete functionality
      const res = await deleteSelectedClass(classId);

      refetch();
      res?.data?.deletedCount &&
        toast.success("Selected course delete successfully !");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (classes && classes?.data?.length === 0) {
    return (
      <div className="h-[94vh] w-[100%] flex items-center justify-center">
        <p className="text-sm text-red-500 font-medium">
          Student has not selected class!
        </p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Artistry Academia | Selected Class</title>
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
                <th>ClassName</th>
                <th>Instructors name</th>
                <th>Available seats</th>
                <th>Action</th>
                <th>Pay</th>
              </tr>
            </thead>
            <tbody>
              {classes?.data?.map((classData, index) => (
                <SelectedClassRow
                  key={classData._id}
                  classData={classData}
                  handleDelete={handleDelete}
                  index={index}
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

export default SelectedClass;
