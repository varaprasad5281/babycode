import React, { useState } from "react";
import ProfileIcon from "../../assets/images/profile-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { PiCaretRightBold, PiCaretLeftBold } from "react-icons/pi";
import ListeningTests from "./components/ListeningTests";
import ImproveListening from "./components/ImproveListening";
import { ImHeadphones } from "react-icons/im";

const components = [
  { title: "Listening Tests" },
  { title: "Improve Listening", icon: <ImHeadphones /> },
];
const Listening = () => {
  const navigate = useNavigate();
  const [componentToShow, setComponentToShow] = useState(0);
  return (
    <div className="w-full lg:max-h-screen bg-background overflow-scroll pb-5">
      <div className="pt-[2.8rem] sticky z-10 left-0 top-0 hidden lg:flex justify-end items-center pb-[0.4rem] w-full bg-white">
        <div className="items-center gap-6 px-[3rem]">
          <div className="p-[.2rem] rounded-full cursor-pointer">
            <img
              src={ProfileIcon}
              alt=""
              className="w-8 h-8 object-contain rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="flex lg:hidden fixed z-10 w-full px-6 py-3 border-b border-black/10 bg-white">
        <div
          className="flex text-xl items-center gap-2 w-fit cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <PiCaretLeftBold />
          <h5 className="">Listening Practice</h5>
        </div>
      </div>

      <div className="w-full lg:py-[2.2rem] overflow-scroll">
        <div className="hidden lg:flex items-center gap-1 px-6 lg:px-[3rem]">
          <Link to="/">Home</Link>
          <PiCaretRightBold />
          <Link to="/listening" className="text-primary-500">
            Listening
          </Link>
        </div>

        <div className="flex flex-col gap-3 mt-6 pt-11 lg:pt-0">
          <div className="grid grid-cols-2 sm:flex gap-4 px-6 lg:px-[3rem]">
            {components.map(({ title, icon }, idx) => (
              <div
                className={`${
                  componentToShow === idx
                    ? "border-b pb-1 border-primary-500 text-primary-500"
                    : "text-defaultGray"
                } cursor-pointer`}
                onClick={() => setComponentToShow(idx)}
              >
                <div className="flex justify-center sm:justify-start items-center gap-2">
                  <div className="sm:hidden">{icon && icon}</div>
                  <span>{title}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 w-full">
            {componentToShow === 0 ? <ListeningTests /> : <ImproveListening />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listening;
