import { useState } from "react";
import FeedbackModal from "../UI/ModalData/FeedbackModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { deleteAClass } from "../../api/classes/admin.api";

const ManageClassRow = ({
  classData,
  index,
  handleMakeApprove,
  handleMakeDeny,
  refetch,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDeleteAClass = async (classId) => {
    try {
      const res = await deleteAClass(classId);

      res?.data?.modifiedCount && toast.success("Class deleted successfully");
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster />
      <tr key={classData._id}>
        <td>{index + 1}</td>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img
                  src={classData?.classImage}
                  alt="Avatar Tailwind CSS Component"
                />
              </div>
            </div>
          </div>
        </td>
        <td>{classData?.className}</td>
        <td>{classData?.instructor?.name}</td>
        <td>{classData?.seats}</td>
        <td>${classData?.courseFree}</td>
        <td>{classData?.status}</td>
        <td>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleMakeApprove(classData?._id)}
              className="btn btn-xs btn-color"
              disabled={
                classData?.status === "approved" || classData?.status === "deny"
              }
            >
              Approve
            </button>
            <button
              onClick={() => handleMakeDeny(classData._id)}
              className="btn btn-xs btn-color"
              disabled={
                classData?.status === "deny" || classData?.status === "approved"
              }
            >
              Deny
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="btn btn-xs btn-color"
              disabled={classData?.status === "approved" || classData?.feedback}
            >
              Send Feedback
            </button>
          </div>
          <FeedbackModal
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            closeModal={closeModal}
            classData={classData}
            refetch={refetch}
            id={classData._id}
          />
        </td>
        <td>
          <button onClick={() => handleDeleteAClass(classData?._id)}>
            <RiDeleteBin6Line className=" w-6 h-5 mx-auto text-color" />
          </button>
        </td>
      </tr>
    </>
  );
};

export default ManageClassRow;
