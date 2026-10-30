import { AiOutlineArrowRight } from "react-icons/ai";

const CustomArrowButton = ({props}) => {
  return (
    <div className="flex items-center gap-1 group cursor-pointer">
      <button className="text-color text-[10px] sm:text-xs uppercase font-semibold">
        {props}
      </button>
      <AiOutlineArrowRight className="text-xs sm:text-sm text-color group-hover:translate-x-1 transition-transform" />
    </div>
  );
};

export default CustomArrowButton;
