import { useState } from "react";
import PaymentModal from "../../pages/Dashboard/Payment/PaymentModal";

const SelectedClassRow = ({ classData, index, handleDelete, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img
                  src={classData?.classInfo?.classImage}
                  alt="Class Image"
                />
              </div>
            </div>
          </div>
        </td>
        <td>{classData?.classInfo?.className}</td>
        <td>{classData?.classInfo?.instructor?.name}</td>
        <td>{classData?.classInfo?.seats}</td>
        <td>
          <button
            onClick={() => handleDelete(classData._id)}
            className="btn btn-xs btn-color"
          >
            Delete
          </button>
        </td>
        <td>
          <button
            onClick={() => setIsOpen(true)}
            className="btn btn-xs btn-color"
          >
            ${classData?.classInfo?.courseFree} tk.
          </button>

          <PaymentModal
            classData={classData}
            isOpen={isOpen}
            closeModal={closeModal}
            refetch={refetch}
          />
        </td>
      </tr>
    </>
  );
};

export default SelectedClassRow;
