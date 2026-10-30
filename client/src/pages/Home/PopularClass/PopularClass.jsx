/* eslint-disable no-unused-vars */
import PopularClassCard from "../../../components/Card/PopularClassCard";
import Container from "../../../components/Container/Container";
import CardSkeleton from "../../../components/Card/CardSkeleton";
import { Link } from "react-router-dom";
import CustomArrowButton from "../../../utils/CustomArrowButton";
import { useApproveClass } from "../../../hooks/useClass";

const PopularClass = () => {
  const [classes, isLoading] = useApproveClass();

  return (
    <Container>
      <h2 className="primary-font font-semibold text-[22px] sm:text-3xl md:text-4xl lg:text-5xl uppercase mt-10 sm:mt-20 lg:mt-32 sm:text-center">
        Popular Classes
      </h2>
      <p className="sm:mt-3 text-xs sm:text-sm md:text-base lg:text-lg sm:text-center mb-6 sm:mb-8">
        Discover our popular art classes and explore your creative potential
      </p>
      {/* Show large devices button */}
      <Link to="/all-classes">
        <div className="hidden sm:flex justify-end mb-3 md:mb-4">
          <CustomArrowButton props={"See all classes"} />
        </div>
      </Link>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading &&
          Array.from(new Array(8)).map((item, index) => (
            <CardSkeleton key={index} height={300} />
          ))}
        {!isLoading &&
          classes?.data?.slice(0, 8)
            .map((classData) => (
              <PopularClassCard key={classData._id} classData={classData} />
            ))}
      </div>
      {/* For phone devices */}
      <Link to="/all-classes">
        <div className="btn btn-color btn-xs mx-auto w-28 mt-1 sm:mt-2 flex sm:hidden items-center justify-center group cursor-pointer mb-2">
          <button className="text-[10px] sm:text-xs uppercase font-semibold hover:underline">
            See all classes
          </button>
        </div>
      </Link>
    </Container>
  );
};

export default PopularClass;
