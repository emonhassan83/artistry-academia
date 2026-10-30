import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import { useTheme } from "../../providers/ThemeProvider";
import ReusableForm from "../../components/Form/ReusableForm";
import ReusableInput from "../../components/Form/ReusableInput";
import ReusableTextArea from "../../components/Form/ReusableTextArea";
import ReusableSelect from "../../components/Form/ReusableSelect";
import ReusableMultiSelect from "../../components/Form/ReusableMultiSelect";
import {
  courseDurationOptions,
  courseLevelOptions,
  courseMaterialsOptions,
  courseRequirementsOptions,
  courseTimeOptions,
} from "../../components/Form/FormSelectData";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addClass } from "../../api/classes/instructors.api";
import { useInstructorById } from "../../hooks/useInstructor";
import { useGetAllUsers } from "../../hooks/useFetchUsers";

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [users] = useGetAllUsers();

  const currentUser = users?.data?.find((userData) => userData?.email === user?.email);
  const userId = currentUser?._id;
  const [instructorBio] = useInstructorById({
    id: userId,
  });

  const onSubmit = async (data) => {
    try {
      const courseData = {
        ...data,
        courseFree: Number(data?.courseFree),
        seats: Number(data?.seats),
        instructor: {
          email: currentUser?.email,
          image: currentUser?.image,
          name: currentUser?.name,
        },
        instructorBio: {
          biography: instructorBio?.data?.biography,
          education: instructorBio?.data?.education,
          experience: instructorBio?.data?.experience,
          teachingPhilosophy: instructorBio?.data?.teachingPhilosophy,
          specialization: instructorBio?.data?.specialization,
          achievements: instructorBio?.data?.achievements,
        },
        level: data?.level || "Intermediate",
        duration: data?.duration || "6 weeks",
        time: data?.time || "Tuesday and Thursday, 4:00 PM - 6:00 PM",
        requirements: data?.requirements?.map((item) => item?.value),
        materials: data?.materials?.map((item) => item?.value),
        status: "pending",
        enrolledCourse: 0,
        availedCourseSeat: true,
        isDeleted: false,
        createdAt: new Date().toISOString(),
      };

      //* save class data in database
      const res = await addClass(courseData);
      res?.data?.insertedId && toast.success("Course created successfully !");
      navigate("/dashboard/my-class");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`w-[90%] sm:w-[95%] lg:w-[90%] mx-auto my-6 py-10 md:px-14 px-8 border-[1px]  ${
        theme.mode === "dark"
          ? "text-gray-100 border-[#ababab]"
          : "text-gray-800"
      }`}
    >
      <Helmet>
        <title>Artistry Academia | Add A Class</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-8 text-center">
        Add A Course Details
      </h2>
      <ReusableForm onSubmit={onSubmit}>
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

export default AddClass;
