import React, { useState } from "react";
import ReelIcon from "../../../assets/svg/FilmReel.svg";
import NewsIcon from "../../../assets/svg/Newspaper.svg";
import BooksIcon from "../../../assets/svg/Book.svg";
import { PiCaretRightBold, PiCaretDownBold } from "react-icons/pi";

const ImproveListening = () => {
  return (
    <div className="flex flex-col w-full sm:gap-1 sm:px-6 lg:px-[3rem]">
      <h3 className="text-lg font-medium sm:hidden mb-2 mx-6">
        Improve Listening with these Audios{" "}
      </h3>
      <News />
      <Books />
      <Reel />
    </div>
  );
};

export default ImproveListening;

const News = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full flex flex-col gap-3">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="border-l-2 border-[#0E946E] bg-white cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3 shadow-sm"
      >
        <div className="flex flex-col gap-2">
          <div className="h-fit w-fit rounded-md sm:bg-[#0e946e14] p-1 flex gap-1 items-center">
            <img
              src={NewsIcon}
              className="w-6 aspect-square object-contain"
              alt=""
            />
            <span className="text-[#0E946E] text-sm font-medium">News</span>
          </div>
          <p className="text-md font-medium">Listen to English News</p>
        </div>
        <div className="flex justify-between gap-3 items-start">
          <span className="text-[#AAAAAA] text-sm">
            Listen English news and get familiar with English accent
          </span>
          <button className="" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <PiCaretDownBold /> : <PiCaretRightBold />}
          </button>
        </div>
      </div>
      {/* {isOpen && (
          <div className="text-sm text-defaultGray border-t border-t-[#aaaaa] pt-3">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis id
              aut recusandae reiciendis tempora quis est ea explicabo earum quam,
              impedit tempore doloribus voluptatum ratione illum ipsam labore eos?
              Adipisci.
            </p>
          </div>
        )} */}
    </div>
  );
};

const Books = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full flex flex-col gap-3">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="border-l-2 border-[#01B5D6] bg-white cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3 shadow-sm"
      >
        <div className="flex flex-col gap-2">
          <div className="h-fit w-fit rounded-md sm:bg-[#ECFCFF] p-1 flex gap-1 items-center">
            <img
              src={BooksIcon}
              className="w-6 aspect-square object-contain"
              alt=""
            />
            <span className="text-[#01B5D6] text-sm font-medium">Books</span>
          </div>
          <p className="text-md font-medium">Listen to English News</p>
        </div>
        <div className="flex justify-between gap-3 items-start">
          <span className="text-[#AAAAAA] text-sm">
            Listen English news and get familiar with English accent
          </span>
          <button className="" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <PiCaretDownBold /> : <PiCaretRightBold />}
          </button>
        </div>
      </div>
      {/* {isOpen && (
          <div className="text-sm text-defaultGray border-t border-t-[#aaaaa] pt-3">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis id
              aut recusandae reiciendis tempora quis est ea explicabo earum quam,
              impedit tempore doloribus voluptatum ratione illum ipsam labore eos?
              Adipisci.
            </p>
          </div>
        )} */}
    </div>
  );
};

const Reel = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full flex flex-col gap-3">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="border-l-2 border-[#FF3B5D] bg-white cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3 shadow-sm"
      >
        <div className="flex flex-col gap-2">
          <div className="h-fit w-fit rounded-md sm:bg-[#FFEFF2] p-1 flex gap-1 items-center">
            <img
              src={ReelIcon}
              className="w-6 aspect-square object-contain"
              alt=""
            />
            <span className="text-[#FF3B5D] text-sm font-medium">News</span>
          </div>
          <p className="text-md font-medium">Listen to English News</p>
        </div>
        <div className="flex justify-between gap-3 items-start">
          <span className="text-[#AAAAAA] text-sm">
            Listen English news and get familiar with English accent
          </span>
          <button className="" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <PiCaretDownBold /> : <PiCaretRightBold />}
          </button>
        </div>
      </div>
      {/* {isOpen && (
          <div className="text-sm text-defaultGray border-t border-t-[#aaaaa] pt-3">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis id
              aut recusandae reiciendis tempora quis est ea explicabo earum quam,
              impedit tempore doloribus voluptatum ratione illum ipsam labore eos?
              Adipisci.
            </p>
          </div>
        )} */}
    </div>
  );
};
