import { Link } from "react-router-dom";
import { useTheme } from "../../providers/ThemeProvider";
import CustomArrowButton from "../../utils/CustomArrowButton";

const InstructorCard = ({ instructor }) => {
  const { theme } = useTheme(); // for using light and dark themes
  return (
    <div className="w-full bg-base-100">
      <figure>
        <img
          className="w-full rounded-sm hover:scale-105 duration-[1500ms]"
          src={instructor?.image}
          alt="Instructor Image"
        />
      </figure>
      <div className="flex flex-col mt-2 sm:mt-3 lg:mt-4">
        <h2
          className={`text-sm sm:text-base font-semibold ${
            theme.mode === "dark" ? "text-gray-100" : "text-gray-800"
          } mb-1 `}
        >
          {instructor?.name}
        </h2>

        <Link to={`classes/${instructor?.email}`}>
          <CustomArrowButton props={"See Classes"} />
        </Link>
      </div>
    </div>
  );
};

export default InstructorCard;
