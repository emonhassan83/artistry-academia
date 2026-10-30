import { Helmet } from "react-helmet-async";
import { useEnrollClass } from "../../../hooks/useClass";
import PaymentHistoryRow from "../../../components/Dashboard/PaymentHistoryRow";
import { useTheme } from "../../../providers/ThemeProvider";

const PaymentHistory = () => {
  const [classes] = useEnrollClass();
  const { theme } = useTheme(); //* for using light and dark themes

  if (classes && classes?.data?.length === 0) {
    return (
      <div className="h-[94vh] w-[100%] flex items-center justify-center">
        <p className="text-sm text-red-500 font-medium">
          Student has no payment history!
        </p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Artistry Academia | Payment History</title>
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
                <th>ClassName</th>
                <th>Instructor Name</th>
                <th>Transaction Id</th>
                <td>Payment Date</td>
                <td>Pay Amount</td>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {classes?.data &&
                classes?.data?.map((classData, index) => (
                  <PaymentHistoryRow
                    key={classData._id}
                    classData={classData}
                    index={index}
                  />
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default PaymentHistory;
