import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./CardComponent.css";

const CardSkeleton = ({height}) => {
  return (
    <div className="card-skeleton">
      <div>
        <Skeleton width={["100%"]} height={height} />
      </div>

      <div className="py-2">
        <Skeleton width={["100%"]} height={25}/>
        <p className="my-1">
        <Skeleton width={["100%"]} height={20}/>
        </p>
        <p className="mt-2 flex justify-center">
        <Skeleton width={120} height={32}/>
        </p>
      </div>
    </div>
  );
};

export default CardSkeleton;
