/* eslint-disable no-unused-vars */
import { Fade } from "react-awesome-reveal";
import CustomArrowButton from "../../utils/CustomArrowButton";
import { Link } from "react-router-dom";

const PopularClassCard = ({ classData }) => {
  // console.log(classData);
  const { _id ,className, classImage } = classData;
  
  return (
    //  <Fade duration={2000}>
    <div className="card w-full bg-base-100 rounded-none">
      <figure>
        <img
          className="w-full sm:h-[240px] md:h-[210px] rounded-sm hover:scale-105 duration-[1500ms]"
          src={classImage}
          alt="Class Image"
        />
      </figure>
      <div className="flex flex-col mt-2 sm:mt-3 lg:mt-4">
        <h2 className="text-sm sm:text-base font-semibold">{className}</h2>
        <div className="mt-1 sm:mt-2 flex justify-start mb-3 md:mb-4">
        <Link to={`/classes/class-details/${_id}`}>
        <CustomArrowButton props={"View Details"} />
        </Link>
        </div>
      </div>
    </div>
    //  </Fade>
  );
};

export default PopularClassCard;
