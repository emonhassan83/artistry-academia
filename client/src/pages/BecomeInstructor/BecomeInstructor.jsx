import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../providers/AuthProvider";
import { useTheme } from "../../providers/ThemeProvider";
import { addInstructorBio } from "../../api/instructorsBio/instructorBio";
import toast from "react-hot-toast";
import ReusableForm from "../../components/Form/ReusableForm";
import ReusableInput from "../../components/Form/ReusableInput";
import ReusableTextArea from "../../components/Form/ReusableTextArea";
import { useNavigate } from "react-router-dom";
import { useGetAllUsers } from "../../hooks/useFetchUsers";

const BecomeInstructor = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [users, refetch ] = useGetAllUsers();

  const currentUser = users.find((userData) => userData?.email === user?.email);

  const onSubmit = async (data) => {
    try {
      const bioData = {
        ...data,
        user: currentUser._id,
        createdAt: new Date().toISOString(),
      };

      //* saveInstructor bio in db
      const res = await addInstructorBio(bioData);
      res?.saveBio?.insertedId &&
        toast.success("User become a instructor successfully created!");

        //* reface all users and navigate 
        refetch();
        navigate("/")
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`w-[85%] md:w-[80%] lg:w-[70%] mx-auto my-6 py-10 md:px-14 px-8 border-[1px] ${
        theme.mode === "dark"
          ? "text-gray-100 border-[#ababab]"
          : "text-gray-800"
      }`}
    >
      <Helmet>
        <title>Artistry Academia | Add A Class</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-8 text-center">
        Add Profession Info
      </h2>
      <ReusableForm onSubmit={onSubmit}>
        <div className="sm:block md:flex items-center justify-between gap-4">
          <div className="w-full">
            <ReusableInput
              type="text"
              name="name"
              label="Instructor Name"
              defaultValue={user?.displayName}
            />
            <ReusableInput
              type="text"
              name="email"
              label="Email Address"
              defaultValue={user?.email}
            />
          </div>
          <div className="w-full">
            <ReusableTextArea
              type="text"
              name="biography"
              label="Biography"
              placeholder="Enter your biography..."
            />
          </div>
        </div>

        <div className="sm:block md:flex flex-row-reverse items-center justify-between gap-4">
          <div className="w-full">
            <ReusableInput type="text" name="education" label="Education" placeholder="Educational background.." />
            <ReusableInput type="text" name="experience" label="Experience"placeholder="Your experience..." />
          </div>
          <div className="w-full">
            <ReusableTextArea
              type="text"
              name="teachingPhilosophy"
              label="Teaching Philosophy"
              placeholder="Enter your teaching philosophy..."
            />
          </div>
        </div>
        <div className="sm:block md:flex items-center justify-center gap-2">
        <div className="w-full">
        <ReusableInput
          type="text"
          name="specialization"
          label="Specialization"
          placeholder="Enter your specialization..."
        />
        </div>
        <div className="w-full">
        <ReusableInput
          type="text"
          name="achievements"
          label="Achievements"
          placeholder="Enter your achievements..."
        />
        </div>
        </div>
        <input
          type="submit"
          value="Become a Instructor"
          className="btn btn-color text-xs w-[160px] border-none rounded-lg"
        />
      </ReusableForm>
    </div>
  );
};

export default BecomeInstructor;
