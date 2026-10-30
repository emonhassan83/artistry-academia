import { NavLink } from "react-router-dom";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { GiTeacher } from "react-icons/gi";
import { useTheme } from "../../../providers/ThemeProvider";

const InstructorSidebar = () => {
  const { theme } = useTheme(); // for using light and dark themes
  return (
    <nav  className={`${
      theme.mode === "dark" ? "text-gray-100 bg-[#1D232A]" : "text-gray-800 bg-gray-100"
    }`}>
      <>
        {/* Menu Links */}
        <NavLink
          to="add-class"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
              theme.mode === "dark" ? "text-gray-100 bg-[#1D232A]" : "text-gray-800"
            } ${
              isActive ? "bg-gray-300" : ""
            }`
          }
        >
          <AiOutlineVideoCameraAdd className="w-5 h-5" />

          <span className="mx-4 font-medium">Add a Class</span>
        </NavLink>
        <NavLink
          to="my-class"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
              theme.mode === "dark" ? "text-gray-100 bg-[#1D232A]" : "text-gray-800"
            } ${
              isActive ? "bg-gray-300" : ""
            }`
          }
        >
          <GiTeacher className="w-5 h-5" />

          <span className="mx-4 font-medium">My Classes</span>
        </NavLink>
      </>
    </nav>
  );
};

export default InstructorSidebar;
