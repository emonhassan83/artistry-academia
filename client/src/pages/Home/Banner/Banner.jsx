import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import banner1 from "../../../assets/banner/banner1.jpg";
import banner2 from "../../../assets/banner/banner2.jpg";
import banner3 from "../../../assets/banner/banner3.jpg";
import banner4 from "../../../assets/banner/banner4.jpg";
import banner5 from "../../../assets/banner/banner5.jpg";

const Banner = () => {
  // const showArrows = window.innerWidth >= 640;
  const bannerText = (
    <>
      <div className="absolute top-20 sm:top-32 lg:top-40 xl:top-48 lg:left-14 lg:flex flex-col items-start w-full xl:w-2/4 md:px-4 xl:px-0">
        <h1 className="primary-font text-2xl sm:text-[34px] md:text-5xl lg:text-6xl xl:text-7xl uppercase">
          Living in color
        </h1>
        <h6 className="primary-font uppercase text-xs sm:text-base md:text-xl lg:text-3xl lg:mt-3">
         Discovering The Art At Our Summer Camp
        </h6>
        <p className="text-base secondary-font hidden sm:block lg:text-left my-8">
          Welcome to Artistry Academia .When you take a flower in your hand and really look at it, its your
          world for the moment. I want to give that world to someone else. Most
          people in the city rush around so, they have no time to look at a
          flower. I want them to see it whether they want to or not.{" "}
        </p>
        <button className="btn btn-outline hidden lg:block  sm:btn-sm px-5 rounded-3xl text-white hover:bg-[#3da5d9] hover:border-none my-1 lg:my-2 xl:my-4 uppercase">Explore more</button>
      </div>
    </>
  );
  return (
    <Carousel className="text-white" autoPlay infiniteLoop showThumbs={false} showIndicators={false} >
      <div className="relative">
        <img src={banner1} />
        {bannerText}
      </div>
      <div className="relative">
        <img src={banner2} />
        {bannerText}
      </div>
      <div className="relative">
        <img src={banner3} />
        {bannerText}
      </div>
      <div className="relative">
        <img src={banner4} />
        {bannerText}
      </div>
      <div className="relative">
        <img src={banner5} />
        {bannerText}
      </div>
    </Carousel>
  );
};

export default Banner;
