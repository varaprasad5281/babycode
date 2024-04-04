import React, { useState } from "react";
import { motion } from "framer-motion";
import { GoBookmarkFill } from "react-icons/go";
import { CiBookmark } from "react-icons/ci";
import { PiCaretLeftBold } from "react-icons/pi";

const OffcanvasData = ({ showOffcanvas, setShowOffcanvas }) => {
  const [saved, setSaved] = useState(false);
  return (
    <motion.div
      animate={showOffcanvas ? { x: 0 } : { x: "calc(100vw + 50%)" }}
      initial={{ x: "calc(100vw + 50%)" }}
      exit={{ x: "calc(100vw + 50%)" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="w-full lg:w-[35vw] h-[100vh] overflow-scroll bg-white fixed right-0 top-0 z-10 shadow-left"
    >
      <div
        onClick={() => setShowOffcanvas(false)}
        className="sticky top-0 bg-white cursor-pointer text-xl lg:text-lg w-full px-6 py-3 border-b border-black/20 flex items-center gap-3"
      >
        <PiCaretLeftBold />
        <h5 className="lg:font-medium">You are what you eat</h5>
      </div>
      <div className="px-6 py-2 w-full flex justify-between mt-3">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold">Dairy</p>
          <span className="text-[#aaaaaa]">दुग्धालय</span>
        </div>
        {saved ? (
          <button
            onClick={() => setSaved(false)}
            className="p-2 text-2xl w-10 h-10 flex justify-center items-center bg-white text-primary-500 shadow-lg rounded-full"
          >
            <GoBookmarkFill />
          </button>
        ) : (
          <button
            onClick={() => setSaved(true)}
            className="p-2 text-2xl w-10 h-10 flex justify-center items-center rounded-full bg-white shadow-lg"
          >
            <CiBookmark />
          </button>
        )}
      </div>
      <div className="px-6 my-6 flex flex-col gap-3">
        <div className="bg-[#FABB141C] p-1 w-fit">
          <h5 className="text-[#F48E3F]">Definition</h5>
        </div>
        <p>
          A dairy is a place where milk is stored and where butter, cheese and
          other dairy products are made, or a place where those products are
          sold.
        </p>
      </div>
      <div className="px-6 mt-8 flex flex-col gap-3 min-h-[30vh]">
        <div className="bg-[#1BCA991C] p-1 w-fit">
          <h5 className="text-[#1BCA99]">Examples</h5>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <p>1.</p>
            <p>
              <p>The house was next door to a dairy farm.</p>
            </p>
          </div>
          <div className="flex gap-2">
            <p>2.</p>
            <p>
              <p>
                We know dairy foods increases concentration of estrogen in the
                blood.
              </p>
            </p>
          </div>
          <div className="flex gap-2">
            <p>3.</p>
            <p>
              <p>The house was next door to a dairy farm.</p>
            </p>
          </div>
        </div>
      </div>
      <div className="px-6 pb-5 flex items-center gap-2 justify-end">
        <button className="p-2 rounded-full bg-[#EF44441C] text-[#EF4444] hover:bg-[#EF4444] hover:text-white transition-colors duration-200">
          🙃 I don’t know
        </button>
        <button className="p-2 rounded-full bg-[#1BCA9929] text-[#008A64] hover:bg-[#008A64] hover:text-white transition-colors duration-200">
          😀 I already knew it
        </button>
      </div>
    </motion.div>
  );
};

export default OffcanvasData;
