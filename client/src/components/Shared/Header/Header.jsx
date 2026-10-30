import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo/logo.png";
import { AuthContext } from "../../../providers/AuthProvider";
import { useTheme } from "../../../providers/ThemeProvider";
import { BsCloudSunFill, BsFillCloudMoonFill } from "react-icons/bs";
import UserModal from "./UserModal";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut, role } = useContext(AuthContext);
  const { theme, themeSwitchHandler } = useTheme(); // for using light and dark themes

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme.mode);
  }, [theme]);

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => console.log(error));
  };

  return (
    <div
      className={`max-w-[2520px] bg-gray-100 sticky top-0 z-10 bg-transparent backdrop-blur-md xl:px-16 md:px-10 sm:px-2 px-4 mx-auto h-[65px] sm:h-[75px] shadow-md ${
        theme.mode === "dark" ? "text-gray-100" : "text-black"
      }`}
    >
      <div className="relative flex items-center justify-between">
        <Link
          to="/"
          aria-label="Artistry Academia"
          title="Artistry Academia"
          className="inline-flex items-center"
        >
          <div className="flex items-center justify-center w-32 sm:w-48 h-16 sm:h-20">
            <img className="w-32 sm:w-40 lg:w-48" src={logo} alt="Logo Image" />
          </div>
        </Link>
        <ul className="items-center lg:text-[15px] hidden space-x-8 lg:flex">
          <li>
            <NavLink
              to="/"
              aria-label="Home"
              title="Home"
              className={({ isActive }) => (isActive ? "active" : "default")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/instructors"
              aria-label="Instructors"
              title="Instructors"
              className={({ isActive }) => (isActive ? "active" : "default")}
            >
              Instructors
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-classes"
              aria-label="Classes"
              title="Classes"
              className={({ isActive }) => (isActive ? "active" : "default")}
            >
              Classes
            </NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink
                  to={role === "admin" ? "/dashboard/manage-users" : (role === "instructor" ? "/dashboard/add-class" : "/dashboard/selected-class")}
                  aria-label="DashBoard"
                  title="DashBoard"
                  className={({ isActive }) =>
                    isActive ? "active" : "default"
                  }
                >
                  DashBoard
                </NavLink>
              </li>
            </>
          )}
        </ul>
        <ul className="hidden lg:flex items-center space-x-4">
          <Link to='/become-instructor'>
          <div className={`${role === "student" ? "block" : "hidden"}`}>
            <button className="btn btn-ghost btn-sm text-[13px]">
              Become instructor
            </button>
          </div>
          </Link>

          {/* For dark and light mood */}
          <div className="-mr-1">
            {theme.mode == "dark" ? (
              <BsCloudSunFill
                title="Make Light"
                className="text-[26px] cursor-pointer"
                onClick={() => themeSwitchHandler()}
              />
            ) : (
              <BsFillCloudMoonFill
                title="Make Dark"
                className="text-[26px] cursor-pointer"
                onClick={() => themeSwitchHandler()}
              />
            )}
          </div>
          <div>
            {user ? (
              <>
                <UserModal handleLogOut={handleLogOut} />
              </>
            ) : (
              <Link to="/login">
                <button className="btn btn-outline hidden lg:block btn-sm px-5 rounded-3xl text-black hover:bg-[#3da5d9] hover:border-none my-4 uppercase">
                  Login
                </button>
              </Link>
            )}
          </div>
        </ul>

        <div className="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <AiOutlineMenu className="w-5" />
          </button>
          {isMenuOpen && (
            <div className="absolute z-10 top-0 left-0 w-full">
              <div
                className={`p-5 border rounded shadow-sm  ${
                  theme.mode === "dark"
                    ? "text-gray-100 bg-gray-800 border-gray-800"
                    : "text-black bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <div>
                    <Link
                      to="/"
                      aria-label="Artistry Academia"
                      title="Artistry Academia"
                      className="inline-flex items-center"
                    >
                      <div className="flex items-center justify-center mt-2 sm:mt-4">
                        <img
                          className="w-32 sm:w-36"
                          src={logo}
                          alt="Logo Image"
                        />
                      </div>
                    </Link>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className="space-y-2 sm:space-y-3 md:space-y-4 text-xs sm:text-sm">
                    <li>
                      <Link
                        to="/instructors"
                        aria-label="Instructors"
                        title="Instructors"
                        className="font-medium tracking-wide transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Instructors
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/all-classes"
                        aria-label="Classes"
                        title="Classes"
                        className="font-medium tracking-wide transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Classes
                      </Link>
                    </li>
                    {user && (
                      <li>
                        <Link
                          to={role === "admin" ? "/dashboard/manage-users" : (role === "instructor" ? "/dashboard/add-class" : "/dashboard/selected-class")}
                          aria-label="DashBoard"
                          title="DashBoard"
                          className="font-medium tracking-wide transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          DashBoard
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link to='/become-instructor'>
                      <div
                        className={`${role === "student" ? "block" : "hidden"} -ml-2`}
                      >
                        <button className="btn btn-ghost btn-xs text-[13px]">
                          Become instructor
                        </button>
                      </div>
                      </Link>
                    </li>
                    {/* For dark and light mood */}
                    <div className="-mr-4">
                      {theme.mode == "dark" ? (
                        <BsCloudSunFill
                          title="Make Light"
                          className="text-xl sm:text-2xl cursor-pointer"
                          onClick={() => themeSwitchHandler()}
                        />
                      ) : (
                        <BsFillCloudMoonFill
                          title="Make Dark"
                          className="text-xl sm:text-2xl cursor-pointer"
                          onClick={() => themeSwitchHandler()}
                        />
                      )}
                    </div>

                    {user ? (
                      <li>
                        <UserModal handleLogOut={handleLogOut} />
                      </li>
                    ) : (
                      <>
                        <Link to="/login">
                          <button className="btn btn-outline btn-sm px-5 rounded-3xl text-black hover:bg-[#3da5d9] hover:border-none my-4 -ml-2 uppercase">
                            Login
                          </button>
                        </Link>
                      </>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
