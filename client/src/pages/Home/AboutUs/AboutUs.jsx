// import { Fade } from "react-awesome-reveal";
import img1 from "../../../assets/about/about.png";
import Container from "../../../components/Container/Container";

const AboutUs = () => {
  return (
    <Container className="mb-16 lg:mb-32">
      <h1 className="primary-font font-semibold text-[22px] sm:text-3xl md:text-4xl lg:text-5xl uppercase mt-14 md:mt-20 lg:mt-32 sm:text-center">
        ABOUT US
      </h1>
      <p className="sm:mt-3 text-xs sm:text-sm md:text-base lg:text-lg sm:text-center mb-6 sm:mb-10">
        Explore our About Us section and connect to us
      </p>
      {/* <Fade duration={2000}> */}
        <div className="lg:flex items-center gap-8 sm:mt-10">
          <div className="w-full lg:w-1/2 rounded-sm hover:scale-105 duration-[1500ms]">
            <img src={img1} alt="About Us Image" />
          </div>
          <div className="w-full lg:w-1/2 text-center sm:text-left mt-6 lg:mt-0">
            <h3 className="primary-font font-semibold sm:text-xl md:text-3xl uppercase sm:mb-4">
              A LITTLE INTRO
            </h3>
            <p className="text-xs sm:text-sm md:text-base">
              Summar Camp Art School is a creative haven where artistic souls
              can flourish, explore, and express their unique vision through a
              diverse range of mediums.
            </p>
            <h3 className="primary-font font-semibold sm:text-xl md:text-3xl uppercase sm:mb-4 mt-4 sm:mt-6">
              MY EXHIBITIONS
            </h3>
            <p className="text-xs sm:text-sm md:text-base">
              Our exhibitions at Summar Camp Art School are vibrant showcases of
              creativity, featuring stunning artworks that captivate and inspire
              audiences, celebrating the talent and dedication of our students.
            </p>
            <h3 className="primary-font font-semibold sm:text-xl md:text-3xl uppercase sm:mb-4 mt-4 sm:mt-6">
              NEWSLETTER
            </h3>
            <p className="text-xs sm:text-sm md:text-base">
              Stay in the loop with our art-filled newsletter, packed with
              inspiration, updates, and exclusive content from Summar Camp Art
              School.
            </p>

            <div className="flex items-center mt-6">
              <input
              type="text"
                placeholder="Email"
                className="input input-bordered text-xs sm:text-sm md:text-base h-8 sm:h-auto"
              />
              <button className="btn btn-sm sm:btn-md border-s-0 text-[10px] sm:text-sm md:text-base uppercase -mt-2 -ml-[72px] sm:-ml-20 btn-color">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      {/* </Fade> */}
    </Container>
  );
};

export default AboutUs;
