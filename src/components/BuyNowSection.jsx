import CheckIcon from "../assets/svg/check-circle-icon.svg";
import ArrowIcon from "../assets/svg/arrow-circle-right-icon.svg";
import { changeLoginModalStatus } from "../utils/redux/storeSlice";
import { useSelector, useDispatch } from "react-redux";

const content = [
  "Unlimited Speaking Test Access",
  "Unlimited Writing Test Access",
  "Analyze Your Answer",
  "Check Band Score",
];

const BuyNowSection = () => {
  const dispatch = useDispatch();
  const { userLoggedIn } = useSelector((state) => state.store);

  const handleClick = () => {
    !userLoggedIn && dispatch(changeLoginModalStatus(true));
  };
  return (
    <div className="bg-[#E5EFFF] md:m-3 m-0 pb-8 md:pb-0 rounded-xl w-full md:w-[90%] relative">
      <div className="px-4 pt-4">
        <h2 className="text-transparent font-semibold text-lg bg-clip-text bg-gradient-to-r from-[#3561e4] to-[#7A7FFA]">
          Explore premium features with ease!
          {/* #717171 */}
        </h2>
        <div className="flex flex-col gap-2 mt-3 font-medium">
          {content.map((content) => (
            <div
              className="flex gap-2 text-sm md:text-md lg:text-[.80rem] text-[#626262]"
              key={content}
            >
              <img
                src={CheckIcon}
                className="w-[1rem] h-[1rem] object-contain mt-[.10rem]"
                alt=""
              />
              <span className="max-w-[65%] md:max-w-fit">{content}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex absolute bottom-[5%] right-0 gap-3 md:relative flex-col md:flex-row md:justify-between mt-4 md:mt-6 pb-4 font-medium items-end md:items-center w-fit md:w-full">
        <span className="text-sm sm:text-md lg:text-[.80rem] ml-4 mr-2 md:mr-0">
          Only @ ₹ 299
        </span>
        <button
          onClick={handleClick}
          className="text-white shadow-lg bg-primary-500 hover:bg-primary-100 transition-colors duration-300 flex py-3 px-4 md:py-2 md:px-3 text-sm gap-2 rounded-s-full items-center"
        >
          Buy Now{" "}
          <img
            src={ArrowIcon}
            className="h-6 md:w-5 w-6 md:h-5 object-contain"
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default BuyNowSection;
