import React, { useState } from "react";
import ProfileIcon from "../../assets/images/profile-icon.png";
import {
  PiCaretDownBold,
  PiCaretLeftBold,
  PiCaretRightBold,
} from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { motion } from "framer-motion";

const options = [
  { label: "Vocabulary" },
  { label: "Idioms" },
  { label: "Phrasal Verbs" },
  { label: "Collocations" },
];

const contents = [
  1, 2, 3, 4, 
];

const Vocabulary = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(0);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  return (
    <div className="w-full lg:max-h-screen bg-background overflow-scroll pb-5 relative">
      <div className="sticky z-10 left-0 top-0 hidden lg:flex justify-end items-center py-[0.4rem] w-full bg-white">
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
          <h5 className="">Vocabulary</h5>
        </div>
      </div>

      <div className="w-full lg:py-[2.2rem] overflow-scroll">
        <div className="hidden lg:flex items-center gap-1 px-6 lg:px-[3rem]">
          <Link to="/">Home</Link>
          <PiCaretRightBold />
          <Link to="/vocabulary" className="text-primary-500">
            Vocabulary
          </Link>
        </div>

        <div className="flex flex-col gap-3 mt-6 pt-11 lg:pt-0">
          <h4 className="text-lg font-medium px-6 lg:px-[3rem]">
            Improve your vocabulary by learning new words everyday!
          </h4>
          <div className="mt-3 w-full flex justify-between gap-3 items-center px-6 lg:px-[3rem]">
            <div className="flex gap-5">
              {options.map((option, idx) => (
                <div
                  className={`${
                    selectedOption === idx
                      ? "border-b pb-1 border-primary-500 text-primary-500"
                      : "text-defaultGray"
                  } cursor-pointer`}
                  onClick={() => setSelectedOption(idx)}
                  key={idx}
                >
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
            <div className="bg-white w-full max-w-xs border border-gray-300 py-1 px-2 rounded-full flex items-center gap-2">
              <IoIosSearch className="text-3xl text-defaultGray" />
              <input
                type="text"
                className="outline-none border-none w-full"
                placeholder="Search words"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-3 px-6 lg:px-[3rem]">
            {contents.map((content, idx) => (
              <ListItem
                idx={idx}
                key={idx}
                showOffcanvasData={() => setShowOffcanvas(true)}
              />
            ))}
          </div>
        </div>
      </div>
      <motion.div
        animate={showOffcanvas ? { x: 0 } : { x: "calc(100vw + 50%)" }}
        initial={{ x: "calc(100vw + 50%)" }}
        exit={{ x: "calc(100vw + 50%)" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="w-[30vw] h-[100vh] bg-white fixed right-0 top-0 z-10 shadow-left"
      >
        <div
          onClick={() => setShowOffcanvas(false)}
          className="cursor-pointer w-full px-4 py-2 border-b border-black/20 flex items-center gap-3"
        >
          <PiCaretLeftBold className="text-xl" />
          <h5 className="text-lg font-medium">You are what you eat</h5>
        </div>
      </motion.div>
    </div>
  );
};

export default Vocabulary;

const ListItem = ({ idx, showOffcanvasData }) => {
  return (
    <div
      onClick={() => showOffcanvasData()}
      className={`${
        idx % 2 === 0 ? "bg-white" : "bg-transparent"
      } bg-white cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3 shadow-sm`}
    >
      <div className="flex flex-col gap-1">
        <p className="text-md font-medium">You are what you eat</p>
        <span className="text-[#AAAAAA] text-sm">
          Eating healthy food can make you healthy. And eating junk food could
          worsen you...
        </span>
      </div>
      <button className="">
        <PiCaretRightBold />
      </button>
    </div>
  );
};
