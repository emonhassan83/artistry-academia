import React, { useState } from "react";
import AcademiaReusableModal from "../Modal/AcademiaModal";
import ShowCredentialsModalData from "../ModalData/ShowCredentialsModal";

const DemoCredentialsButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 btn-color text-white rounded btn-block"
      >
        Show Demo Credentials
      </button>
      <AcademiaReusableModal
        isOpen={isModalOpen}
        closeModal={handleCloseModal}
        title="Demo Credentials"
        maxWidth="max-w-xl"
      >
        <ShowCredentialsModalData setOpen={setIsModalOpen} />
      </AcademiaReusableModal>
    </>
  );
};

export default DemoCredentialsButton;
