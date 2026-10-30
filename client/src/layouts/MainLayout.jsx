import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signUp") || location.pathname.includes("user-profile");
  return (
    <div>
      {noHeaderFooter || <Header />}
      <div className="">
        <Outlet />
        <Toaster/>
      </div>
      {noHeaderFooter || <Footer />}
    </div>
  );
};

export default MainLayout;
