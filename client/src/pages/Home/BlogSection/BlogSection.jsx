// import { Fade} from "react-awesome-reveal";
import { BlogData } from "./BlogData";

const BlogSection = () => {
  return (
    <div className="mx-3 sm:mx-0 my-16 sm:mt-32 sm:mb-20">
      <h2 className="primary-font font-semibold text-[22px] sm:text-3xl md:text-4xl lg:text-5xl uppercase mt-14 md:mt-20 lg:mt-32 sm:text-center">
        Blog
      </h2>
      <p className="sm:mt-3 text-xs sm:text-sm md:text-base lg:text-lg sm:text-center mb-6 sm:mb-10">
        Explore our blog section and discovering the World through Art Blog
      </p>
      <div className="sm:mt-10">
        {/* <Fade duration={2000}> */}
        <div className="lg:flex lg:mt-0 items-center gap-8">
          <div className="w-full lg:w-1/2">
            <img
              className="w-full rounded-sm hover:scale-105 duration-[1500ms]"
              src={BlogData[0].img}
              alt="Blog Image"
            />
          </div>
          <div className="w-full lg:w-1/3 mx-auto text-center mt-6 lg:mt-0">
            <h2 className="primary-font font-semibold sm:text-xl md:text-3xl uppercase sm:mb-4">
              {BlogData[0].title}
            </h2>
            <p className="text-xs sm:text-sm md:text-base">
              <strong>Acrylic painting,</strong>
              {BlogData[0].description}
            </p>
            <div className="text-center mt-4">
              <button className="btn btn-xs sm:btn-md uppercase btn-outline hover:bg-[#3da5d9] hover:border-none">
                view gallery
              </button>
            </div>
          </div>
        </div>
        {/* </Fade> */}
        {/* <Fade duration={2000}> */}
        <div className="lg:flex mt-8 lg:mt-0 flex-row-reverse items-center gap-8">
          <div className="w-full lg:w-1/2">
            <img
              className="w-full rounded-sm hover:scale-105 duration-[1500ms]"
              src={BlogData[1].img}
              alt="Blog Image"
            />
          </div>
          <div className="w-full lg:w-1/3 mx-auto text-center mt-6 lg:mt-0">
            <h2 className="primary-font font-semibold sm:text-xl md:text-3xl uppercase sm:mb-4">
              {BlogData[1].title}
            </h2>
            <p className="text-xs sm:text-sm md:text-base">
              <strong>Encaustic painting,</strong>
              {BlogData[1].description}
            </p>
            <div className="text-center mt-4">
              <button className="btn btn-xs sm:btn-md uppercase btn-outline hover:bg-[#3da5d9] hover:border-none">
                view gallery
              </button>
            </div>
          </div>
        </div>
        {/* </Fade> */}
        {/* <Fade duration={2000}> */}
        <div className="lg:flex mt-8 lg:mt-0 items-center gap-8">
          <div className="w-full lg:w-1/2">
            <img
              className="w-full rounded-sm hover:scale-105 duration-[1500ms]"
              src={BlogData[2].img}
              alt="Blog Image"
            />
          </div>
          <div className="w-full lg:w-1/3 mx-auto text-center mt-6 lg:mt-0">
            <h2 className="primary-font font-semibold sm:text-xl md:text-3xl uppercase sm:mb-4">
              {BlogData[2].title}
            </h2>
            <p className="text-xs sm:text-sm md:text-base">
              <strong>Oil Painting,</strong>
              {BlogData[2].description}
            </p>
            <div className="text-center mt-4">
              <button className="btn btn-xs sm:btn-md uppercase btn-outline hover:bg-[#3da5d9] hover:border-none">
                view gallery
              </button>
            </div>
          </div>
        </div>
        {/* </Fade> */}
        {/* <Fade duration={2000}> */}
        <div className="lg:flex mt-8 lg:mt-0 flex-row-reverse items-center gap-8">
          <div className="w-full lg:w-1/2">
            <img
              className="w-full rounded-sm hover:scale-105 duration-[1500ms]"
              src={BlogData[3].img}
              alt="Blog Image"
            />
          </div>
          <div className="w-full lg:w-1/3 mx-auto text-center mt-6 lg:mt-0">
            <h2 className="primary-font font-semibold sm:text-xl md:text-3xl uppercase sm:mb-4">
              {BlogData[2].title}
            </h2>
            <p className="text-xs sm:text-sm md:text-base">
              <strong>Impasto,</strong>
              {BlogData[3].description}
            </p>
            <div className="text-center mt-4">
              <button className="btn btn-xs sm:btn-md uppercase btn-outline hover:bg-[#3da5d9] hover:border-none">
                view gallery
              </button>
            </div>
          </div>
        </div>
        {/* </Fade> */}
      </div>
    </div>
  );
};

export default BlogSection;
