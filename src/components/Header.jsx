import ProfileIcon from "../assets/images/profile-icon.png";
import IGIcon from "../assets/images/instagram-icon.png";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeLoginModalStatus } from "../utils/redux/storeSlice";

const options = ["IELTS", "PTE", "TOEFL"];

const Header = () => {
  const [option, setOption] = useState(0);
  const dispatch = useDispatch();
  const { userLoggedIn } = useSelector((state) => state.store);

  const handleClick = () => {
    !userLoggedIn && dispatch(changeLoginModalStatus(true));
  };
  return (
    <div className="flex flex-col fixed left-0 top-0 w-full z-20">
      {/* <div className="flex flex-col sticky left-0 top-0 w-full z-20"> */}
      {/* <div className="hidden lg:flex py-2 bg-[#F6DDC9] justify-center">
        <span className="text-[#DF7146] text-sm">
          Get 50% discount on BabyCode membership
        </span>
      </div> */}
      <div className="lg:hidden z-10 bg-gradient-to-b from-[#1158DA] to-[#002569] py-3 px-6 lg:px-14 md:py-6">
        <div className="flex justify-between items-center">
          <img
            src={ProfileIcon}
            className="w-9 h-9 object-contain cursor-pointer"
            alt=""
            onClick={handleClick}
          />
          <span className="text-white font-medium text-xl">Home</span>
          <img
            src={IGIcon}
            className="w-9 h-9 object-contain cursor-pointer"
            alt="instagram icon"
          />
        </div>
        <div className="rounded-full w-fit mx-auto my-2 flex items-center text-white gap-2 bg-[#1C50AF] p-2">
          {options.map((item, index) => (
            <div className="flex items-center" key={index}>
              {option === 2 && index === 1 ? (
                <div className="h-5 w-[1px] bg-white"></div>
              ) : (
                ""
              )}
              <span
                className={`rounded-full p-2 w-20 flex justify-center cursor-pointer ${
                  index === option
                    ? "bg-white text-[#1C50AF]"
                    : "bg-[#1C50AF] text-white"
                }`}
                onClick={() => setOption(index)}
              >
                {item}
              </span>
              {index === 1 && option === 0 ? (
                <div className="h-5 w-[1px] bg-white"></div>
              ) : (
                ""
              )}
            </div>
          ))}
          {/* <span className="bg-white rounded-full text-[#1C50AF] py-2 px-4 cursor-pointer">
            IELTS
          </span>
          <span className="rounded-full text-white py-2 px-4 cursor-pointer">
            PTE
          </span>
          |
          <span className="rounded-full text-white py-2 px-4 cursor-pointer">
            TOEFL
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
