import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import { BsFillHouseAddFill } from "react-icons/bs";
import { AuthContext } from "../../../providers/AuthProvider";
import logo from "../../../assets/logo/logo.png";
import AdminSidebar from "./AdminSidebar";
import InstructorSidebar from "./InstructorSidebar";
import StudentSidebar from "./StudentSidebar";
import { useTheme } from "../../../providers/ThemeProvider";
const Sidebar = () => {
  const { user, role } = useContext(AuthContext);
  const { theme } = useTheme(); // for using light and dark themes

  const [isActive, setActive] = useState("false");
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div
        className={`text-gray-800 flex justify-between md:hidden ${
          theme.mode === "dark" ? "text-gray-100 " : "text-gray-800 bg-gray-100"
        }`}
      >
        <Link to="/" className="cursor-pointer">
          <div className="block cursor-pointer p-4 font-bold">
            <img className="w-40" src={logo} alt="Dashboard Logo" />
          </div>
        </Link>

        <button
          onClick={handleToggle}
          className={`mobile-menu-button p-4 focus:outline-none focus:bg-gray-200  ${
            theme.mode === "dark"
              ? "text-gray-100 bg-[#1D232A]"
              : "text-gray-800 "
          }`}
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform  ${
          theme.mode === "dark"
            ? "text-gray-100 bg-[#1D232A]"
            : "text-gray-800 bg-gray-100"
        } ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          {/* Branding & Profile Info */}
          <div>
            <div className="w-full hidden md:flex py-2 justify-center items-center mx-auto">
              <Link to="/">
                <img className="w-36 -mt-4" src={logo} alt="Dashboard Logo" />
              </Link>
            </div>
            <div className="flex flex-col items-center mt-6 -mx-2">
              <img
                className="object-cover w-24 h-24 mx-2 rounded-full"
                src={user?.photoURL}
                alt="avatar"
                referrerPolicy="no-referrer"
              />
              <h4 className="mx-2 mt-4 font-medium hover:underline">
                {user?.displayName}
              </h4>
              <p className="mx-2 mt-1 text-sm font-medium hover:underline">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {role && role === "admin" ? (
              <>
                <AdminSidebar />
              </>
            ) : role === "instructor" ? (
              <InstructorSidebar />
            ) : (
              <StudentSidebar />
            )}
          </div>
        </div>

        <div>
          <hr />
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                theme.mode === "dark"
                  ? "text-gray-100 bg-[#1D232A]"
                  : "text-gray-800 bg-gray-100"
              } ${isActive ? "bg-gray-300" : ""}`
            }
          >
            <BsFillHouseAddFill className="w-5 h-5" />

            <span className="mx-4 font-medium">Home</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
