import moment from "moment/moment";

const PaymentHistoryRow = ({ classData, index }) => {
  const formattedDate = moment(classData?.date).format("LLL");

  return (
    <>
      <tr key={classData._id}>
        <td>{index + 1}</td>
        <td>{classData?.classInfo?.className}</td>
        <td>{classData?.classInfo?.instructor?.name}</td>
        <td>{classData?.transactionId}</td>
        <td>{formattedDate}</td>
        <td>${classData?.classInfo?.courseFree}</td>
        <td className="font-medium text-[13px] text-red-600">Paid</td>
      </tr>
    </>
  );
};

export default PaymentHistoryRow;
