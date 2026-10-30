import { NavLink } from "react-router-dom";
import { FaBookReader } from 'react-icons/fa'
import { MdAccountBox, MdPayment } from 'react-icons/md'
import { useTheme } from "../../../providers/ThemeProvider";

const StudentSidebar = () => {
  const { theme } = useTheme(); // for using light and dark themes

    return (
        <nav className={`${
          theme.mode === "dark" ? "text-gray-100 bg-[#1D232A]" : "text-gray-800 bg-gray-100"
        }`}>
              <>
                {/* Menu Links */}
                <NavLink
                  to='selected-class'
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      theme.mode === "dark" ? "text-gray-100 bg-[#1D232A]" : "text-gray-800"
                    } ${
                      isActive ? 'bg-gray-300' : ''
                    }`
                  }
                >
                  <FaBookReader className='w-5 h-5' />

                  <span className='mx-4 font-medium'>Selected Classes</span>
                </NavLink>
                <NavLink
                  to='enrolled-class'
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      theme.mode === "dark" ? "text-gray-100 bg-[#1D232A]" : "text-gray-800"
                    } ${
                      isActive ? 'bg-gray-300' : ''
                    }`
                  }
                >
                  <MdAccountBox className='w-5 h-5' />

                  <span className='mx-4 font-medium'>Enrolled Classes</span>
                </NavLink>
                <NavLink
                  to='payment-history'
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      theme.mode === "dark" ? "text-gray-100 bg-[#1D232A]" : "text-gray-800"
                    } ${
                      isActive ? 'bg-gray-300' : ''
                    }`
                  }
                >
                  <MdPayment className='w-5 h-5' />

                  <span className='mx-4 font-medium'>Payment History</span>
                </NavLink>
              </>
            </nav>
    );
};

export default StudentSidebar;