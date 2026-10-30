import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import BlogSection from "../BlogSection/BlogSection";
import PopularClass from "../PopularClass/PopularClass";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import AboutUs from "../AboutUs/AboutUs";
import { useTheme } from "../../../providers/ThemeProvider";
import WhatsNew from "../WhatsNew/WhatsNew";

const Home = () => {
  const { theme } = useTheme(); // for using light and dark themes
  
  return (
    <div className={`${theme.mode=== 'dark'? 'text-gray-100' : 'text-gray-800'}`}>
      <Helmet>
        <title>Artistry Academia | Home</title>
      </Helmet>
      <Banner />
      <PopularClass />
      <WhatsNew />
      <PopularInstructors />
      <BlogSection />
      <AboutUs/>
    </div>
  );
};

export default Home;
