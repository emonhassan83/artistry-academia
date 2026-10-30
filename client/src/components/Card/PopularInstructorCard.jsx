// import { Fade } from "react-awesome-reveal";
import { useState } from "react";
import AcademiaReusableModal from "../UI/Modal/AcademiaModal";
import ShowBioModalData from "../UI/ModalData/ShowBioModalData";
import CustomArrowButton from "../../utils/CustomArrowButton";

const PopularInstructorCard = ({ instructor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="card bg-base-100 rounded-none">
        <figure>
          <img
            className="w-full rounded-sm hover:scale-105 duration-[1500ms]"
            src={instructor?.image}
            alt="Instructor Image"
          />
        </figure>
        <div className="flex flex-col mt-2 sm:mt-3 lg:mt-4">
          <h2 className="text-sm sm:text-base font-semibold">
            {instructor?.name}
          </h2>
          <div className="mt-1 flex justify-start mb-3 md:mb-4">
            <div
              onClick={handleOpenModal}
              className=" flex items-center justify-center"
            >
              <CustomArrowButton props={"Read Bio"} />
            </div>
          </div>
        </div>
      </div>
      <AcademiaReusableModal
        isOpen={isModalOpen}
        closeModal={handleCloseModal}
        title="Show Bio Modal Data"
        maxWidth="max-w-2xl"
      >
        <ShowBioModalData instructorId={instructor._id} />
      </AcademiaReusableModal>
    </>
  );
};

export default PopularInstructorCard;
