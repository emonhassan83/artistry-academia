import "./Footer.css";
import logo from "../../../assets/logo/logo.png";
import {
  AiOutlineGoogle,
  AiOutlineTwitter,
  AiOutlineInstagram,
} from "react-icons/ai";
import { FaFacebookF, FaLinkedin, FaPinterest, FaTiktok } from "react-icons/fa";
import { useTheme } from "../../../providers/ThemeProvider";

const Footer = () => {
  const { theme } = useTheme(); // for using light and dark themes

  return (
    <div
      className={`max-w-[2520px] xl:px-28 md:px-10 sm:px-2 px-4 text-center sm:text-start ${
        theme.mode === "dark" ? "text-gray-100" : "text-gray-800"
      }`}
    >
      <footer className="grid grid-cols-1 lg:grid-cols-3 pt-16 sm:pt-20">
        <div
          className={`lg:w-[30vw] ${
            theme.mode === "dark" ? "text-gray-100" : "text-gray-600"
          }`}
        >
          <img
            className="w-40 mx-auto sm:mx-0"
            src={logo}
            alt="Footer logo Image"
          />
          <p className="mt-4 text-xs sm:text-sm">
            Artistry Academia is a premier educational website dedicated to
            nurturing creative minds and fostering artistic excellence. art
            forms.
          </p>
          <p className="mt-4 text-xs sm:text-sm">
            Our platform offers a diverse range of courses, resources, and
            inspiration, empowering individuals to explore and master various
          </p>
        </div>
        <div className="lg:ml-40 mx-auto sm:mx-0 text-center sm:text-left text-xs sm:text-sm space-y-1">
          <h6 className="mt-3 md:mt-0 font-semibold">ABOUT US</h6>
          <p className="cursor-pointer hover:underline">Our Story</p>
          <p className="cursor-pointer hover:underline">News & Events</p>
          <p className="cursor-pointer hover:underline">Our Activities</p>
          <p className="cursor-pointer hover:underline">Classes</p>
          <p className="cursor-pointer hover:underline">Contacts</p>
        </div>
        <div>
          <p className="mt-3 md:mt-0 mx-auto sm:mx-0 text-xs sm:text-sm font-semibold">
            BOOK A TOUR
          </p>
          <div
            className={`${
              theme.mode === "dark" ? "text-gray-100" : "text-gray-600"
            }`}
          >
            <div className="sm:mt-2 space-y-1 text-xs sm:text-sm">
              <p className="text-[10px] sm:text-xs text-color font-semibold">
                12 DEC, 16
              </p>
              <h5 className="font-semibold">
                Supporting the Child Personality
              </h5>
              <p className="font-semibold text-[10px] sm:text-xs">
                by Cindy Jefferson | 0 Comments
              </p>
            </div>
            <div className="mt-4 space-y-1 text-xs sm:text-sm">
              <p className="text-[10px] sm:text-xs text-color font-semibold">
                {" "}
                1 DEC, 16
              </p>
              <h5 className="font-semibold">
                Inviting Grandparents to Our Nursery School
              </h5>
              <p className="font-semibold text-[10px] sm:text-xs">
                by Cindy Jefferson | 0 Comments
              </p>
            </div>
          </div>
        </div>
      </footer>
      <div className="mt-2 mb-8">
        <p className="text-center text-xs sm:text-sm lg:pt-20">
          © Artistry Academia{" "}
          <span>
            Disclosures / Terms of Use / Cookie Policy / CCPA Notice at
            Collection / Privacy Policy / Cookie Preferences / CA Residents: Do
            not sell or share my personal information
          </span>
        </p>

        <div className="flex items-center justify-center gap-1 sm:gap-2 mt-4">
          <button className="circle_btn">
            <AiOutlineGoogle className="text-sm sm:text-base" />
          </button>
          <button className="circle_btn">
            <AiOutlineTwitter className="text-sm sm:text-base" />
          </button>
          <button className="circle_btn">
            <AiOutlineInstagram className="text-sm sm:text-base" />
          </button>
          <button className="circle_btn">
            <FaFacebookF className="text-sm sm:text-base" />
          </button>
          <button className="circle_btn">
            <FaPinterest className="text-sm sm:text-base" />
          </button>
          <button className="circle_btn">
            <FaLinkedin className="text-sm sm:text-base" />
          </button>
          <button className="circle_btn">
            <FaTiktok className="text-sm sm:text-base" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
