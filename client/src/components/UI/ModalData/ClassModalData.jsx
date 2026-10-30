import ReusableForm from "../../Form/ReusableForm";
import ReusableInput from "../../Form/ReusableInput";
import ReusableTextArea from "../../Form/ReusableTextArea";
import ReusableSelect from "../../Form/ReusableSelect";
import {
  courseDurationOptions,
  courseLevelOptions,
  courseMaterialsOptions,
  courseRequirementsOptions,
  courseTimeOptions,
} from "../../Form/FormSelectData";
import ReusableMultiSelect from "../../Form/ReusableMultiSelect";
import toast from "react-hot-toast";
import { updateAClass } from "../../../api/classes/instructors.api";

const ClassModalData = ({ classData, closeModal }) => {
  const defaultValues = {
    className: classData?.className,
    classImage: classData?.classImage,
    courseDetails: classData?.courseDetails,
    courseFree: classData?.courseFree,
    seats: classData?.seats,
    certifications: classData?.certifications,
    level: classData?.level,
    duration: classData?.duration,
    time: classData?.time,
    requirements: classData?.requirements,
    materials: classData?.materials,
  };

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        ...data,
        courseFree: Number(data?.courseFree),
        seats: Number(data?.seats),
      };

      //* call update related functionality
      const res = await updateAClass(updatedData, classData._id);
      if (res?.modifiedCount || res?.data?.modifiedCount || res?.success) {
        toast.success("Course updated successfully!");
      }

      closeModal(true);
    } catch (error) {
      toast.error(error.message);
      closeModal(true);
    }
  };

  return (
    <div className="my-3 add-class mx-auto">
      <ReusableForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <div className="sm:block md:flex items-center justify-between gap-4">
          <div className="w-full">
            <ReusableInput
              type="text"
              name="className"
              label="Class Name"
              placeholder="Enter class name ..."
            />
            <ReusableInput
              type="text"
              name="classImage"
              label="Class Image"
              placeholder="Enter class image..."
            />
          </div>
          <div className="w-full">
            <ReusableTextArea
              type="text"
              name="courseDetails"
              label="Course Details"
              placeholder="Provide course details..."
            />
          </div>
        </div>

        <div className="sm:block md:flex flex-row-reverse items-center justify-between gap-4">
          <div className="w-full">
            <ReusableInput
              type="text"
              name="courseFree"
              label="Course Free"
              placeholder="Course Free.."
            />
            <ReusableInput
              type="text"
              name="seats"
              label="Available seats"
              placeholder="Available seats..."
            />
          </div>
          <div className="w-full">
            <ReusableTextArea
              type="text"
              name="certifications"
              label="Certifications"
              placeholder="Enter course certifications..."
            />
          </div>
        </div>
        <div className="sm:block md:flex items-center justify-center gap-2">
          <div className="w-full">
            <ReusableSelect
              name="level"
              label="Course level"
              options={courseLevelOptions}
            />
          </div>
          <div className="w-full">
            <ReusableSelect
              name="duration"
              label="Course duration"
              options={courseDurationOptions}
            />
          </div>
        </div>
        <ReusableSelect
          name="time"
          label="Course time"
          options={courseTimeOptions}
        />
        <ReusableMultiSelect
          name="requirements"
          label="Requirements"
          options={courseRequirementsOptions}
        />
        <ReusableMultiSelect
          name="materials"
          label="Course materials"
          options={courseMaterialsOptions}
        />
        <input
          type="submit"
          value="Add Course"
          className="btn btn-color btn-md text-xs w-[120px] border-none rounded-lg"
        />
      </ReusableForm>
    </div>
  );
};

export default ClassModalData;
