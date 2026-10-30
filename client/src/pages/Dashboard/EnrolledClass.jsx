import { Helmet } from "react-helmet-async";
import { useEnrollClass } from "../../hooks/useClass";
import { useTheme } from "../../providers/ThemeProvider";
import moment from "moment";

const EnrolledClass = () => {
  const [classes] = useEnrollClass();
  const { theme } = useTheme(); //* for using light and dark themes

  if (classes && classes?.data?.length === 0) {
    return (
      <div className="h-[94vh] w-[100%] flex items-center justify-center">
        <p className="text-sm text-red-500 font-medium">
          Student has not enrolled class!
        </p>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Artistry Academia | Enrolled Class</title>
      </Helmet>
      {classes?.data.length > 0 && (
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
                <th>Instructor Name</th>
                <th>Course Level</th>
                <th>Course Duration</th>
                <th>Enrolled Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {classes?.data &&
                classes?.data?.map((classData, index) => (
                  <tr key={classData._id}>
                    <td>{index + 1}</td>

                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={classData?.classInfo?.classImage}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{classData?.classInfo?.className}</td>
                    <td>{classData?.classInfo?.instructor.name}</td>
                    <td>{classData?.classInfo?.level}</td>
                    <td>{classData?.classInfo?.duration}</td>
                    <td>{moment(classData?.date).format("LLL")}</td>
                    <td className="font-medium text-red-600 text-[13px]">
                      Enrolled
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EnrolledClass;
