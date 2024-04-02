import LgImg from "../../../assets/images/boy-image.png";
import SmImg from "../../../assets/images/sm-screen-boy.png";
import { useDispatch } from "react-redux";
import { changeLoginModalStatus } from "../../../utils/redux/otherSlice";
import { checkAuth } from "../../../utils/helpers";

const ShareApp = () => {
  const dispatch = useDispatch();
  
  const handleShareClick = () => {
    if (!checkAuth()) {
      dispatch(changeLoginModalStatus(true));
    }
  };
  return (
    <div className="relative h-[30vh] sm:h-auto md:h-full mb-20 w-full flex justify-start">
      <img
        src={LgImg}
        alt=""
        className="h-full w-full object-cover object-top rounded-2xl hidden md:inline-block"
      />
      <img
        src={SmImg}
        alt=""
        className="h-full w-full object-left object-cover rounded-3xl inline-block md:hidden"
      />
      <div className="absolute flex flex-col items-start md:items-center text-start md:text-center gap-2 sm:gap-5 md:gap-1 left-[50%] sm:left-[45%] top-[50%] -translate-y-[50%] md:top-auto md:-translate-y-0 md:bottom-0 md:left-[50%] md:-translate-x-[50%] md:pr-0 pr-2 py-3 w-auto md:w-[90%]">
        <h3 className="font-jacquesFrancois text-[1.5rem] sm:text-[1.85rem] md:text-[1.4rem] leading-[1.6rem] text-white font-medium text-wrap w-auto md:w-[80%]">
          One Share can save many lives
        </h3>
        <p className="text-gray-300 text-md md:text-sm text-wrap w-auto md:w-[80%]">
          Your one share can unlock a world of education for unprivileged.
        </p>
        <button
          onClick={handleShareClick}
          className="bg-white rounded-full text-gray-700 py-2 md:py-[.3rem] px-10 md:px-10 mt-1 text-base md:text-sm w-fit"
        >
          Share App
        </button>
      </div>
    </div>
  );
};

export default ShareApp;
