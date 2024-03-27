import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import ProfileIcon from "../../assets/images/profile-icon.png";
import Speaking from "../../assets/images/speaking.png";
import Listening from "../../assets/images/listening.png";
import Reading from "../../assets/images/reading.png";
import Writing from "../../assets/images/writing.png";
import Vocalbulary from "../../assets/images/vocabulary.png";
import Classes from "../../assets/images/classes.png";
import BookIelts from "../../assets/images/book-ielts.png";
import StudentNews from "../../assets/images/student-news.png";
import YoutubeIcon from "../../assets/images/youtube-icon.png";
import IGIcon from "../../assets/images/instagram-icon.png";
import ListImg from "../../assets/images/list-image.png";
import ArrowIcon from "../../assets/svg/arrow-circle-right-icon.svg";
import WAIcon from "../../assets/images/whatsapp-icon.png";
import BuyNowSection from "../../components/BuyNowSection";
import ShareApp from "../../components/ShareApp";
import Graph from "../../components/Graph";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";

const gridItems = [
  {
    icon: Speaking,
    title: "Speaking",
  },
  {
    icon: Listening,
    title: "Listening",
  },
  {
    icon: Reading,
    title: "Reading",
  },
  {
    icon: Writing,
    title: "Writing",
  },
  {
    icon: Vocalbulary,
    title: "Vocalbulary",
  },
  {
    icon: Classes,
    title: "Classes",
  },
  {
    icon: BookIelts,
    title: "Book IELTS Exam",
  },
  {
    icon: StudentNews,
    title: "Student News",
  },
];

const Home = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 md:max-h-screen pb-10 md:pb-0">
        <Sidebar />
        <div className="homepage relative w-full flex flex-col bg-[#F7F7F7] md:max-h-screen overflow-y-scroll">
          <div className="sticky left-0 top-0 hidden lg:flex justify-between py-3 w-full px-6 md:px-14 bg-white">
            <h3 className="text-xl font-medium">Your Progress Summary</h3>
            <div className="flex items-center gap-6">
              <img
                src={IGIcon}
                alt=""
                className="w-8 h-8 object-contain cursor-pointer"
              />
              <div
                className="p-2 rounded-full flex items-center text-2xl text-gray-400 border cursor-pointer border-gray-300"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <img
                  src={ProfileIcon}
                  alt=""
                  className="w-8 h-8 object-contain"
                />
                {showDropdown ? <RxCaretUp /> : <RxCaretDown />}
              </div>
            </div>
          </div>
          {showDropdown && (
            <div className="absolute right-16 top-16 bg-white drop-shadow-xl p-2 rounded-lg flex flex-col gap-2 w-[12rem] h-fit z-10">
              <Link to="/">Shop</Link>
              <Link to="/">Community</Link>
              <Link to="/">Feedback</Link>
            </div>
          )}
          <div className="lg:hidden py-4 px-6 md:px-14">
            <div className="bg-gradient-to-r from-[#8ea7d6] to-[#ffdc19] rounded-xl p-[1px] shadow-md">
              <div className="bg-white p-3 rounded-xl flex gap-3 items-center justify-between">
                <span className="text-md font-medium">
                  How many students we helped?
                </span>
                <button className="bg-[#FFEFE1] text-[#F49043] py-2 px-4 rounded-xl">
                  Check
                </button>
              </div>
            </div>
          </div>

          <div className="px-6 md:px-10 py-1">
            <div className="lg:my-3 gap-5">
              <div className="flex flex-col gap-5">
                {/* <h3 className="text-lg font-medium">Your Progress Summary</h3> */}
                <div className="flex justify-between gap-3 h-[60vh] md:h-[304px]">
                  <div className="w-full h-full md:w-[58%] lg:w-[63%] mb-4 md:mb-0 bg-white shadow-lg md:shadow-none rounded-xl p-4">
                    <div className="bg-[#FEF9E5] font-medium p-2 rounded-lg mb-4">
                      <span className="text-sky-500">Wow! </span>
                      <span>You{"'"}re about to reach your targeted band</span>
                    </div>
                    {/* <Line datasetIdKey="id" data={data} options={options} /> */}
                    <Graph />
                  </div>
                  <div className="hidden h-full md:flex w-[38%] flex-1">
                    <ShareApp />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col my-4 w-full items-start">
              <h3 className="hidden md:inline-block text-xl font-medium">
                Prepare with ease
              </h3>
              <div className="w-full flex justify-between items-start mt-2">
                <div className="w-full md:w-[68%] grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6">
                  {/* <div className="w-full md:w-[68%] grid grid-cols-3 sm:grid-cols-4"> */}
                  {gridItems.map(({ icon, title }) => (
                    <Link
                      to="/"
                      className={`flex flex-col justify-self-start items-center mx-2 mb-2 md:mb-3
                  ${title === "Book IELTS Exam" && "order-last md:order-2"}
                  `}
                      key={title}
                    >
                      <img
                        src={icon}
                        alt=""
                        className="w-full aspect-square max-w-24 object-contain"
                      />
                      <span className="text-md md:text-sm font-medium text-center">
                        {title}
                      </span>
                    </Link>
                  ))}
                </div>

                <div className="w-[27%] md:flex flex-col gap-5 hidden mt-3">
                  <button className="w-full flex items-center justify-center gap-2 bg-white shadow-md p-2 rounded-md">
                    <img
                      src={YoutubeIcon}
                      className="w-5 h-5 object-contain"
                      alt=""
                    />
                    <span className="text-sm text-gray-600">
                      App Guide Video
                    </span>
                  </button>
                  <div className="bg-white p-4 rounded-md flex flex-col gap-3 shadow-sm text-center">
                    <h2 className="text-md font-medium">Practice Mock Tests</h2>
                    <p className="text-sm text-gray-600">
                      Get the authentice IELTS exam experience with all four
                      modules covered!
                    </p>
                    <button className="bg-[#1158DA] hover:bg-[#1157dac2] transition-colors duration-300 text-white p-2 rounded-full">
                      Start
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-center justify-between w-full md:hidden bg-white border border-gray-400 p-3 rounded-xl mb-7">
              <div className="flex gap-2 items-start">
                <img src={ListImg} className="w-14 object-contain" alt="" />
                <div className="flex flex-col gap-2">
                  <h4 className="text-xl font-medium">Practice Mock Test</h4>
                  <p className="text-md text-gray-600">
                    Get the authentic IELTS exam experience with all four
                    modules covered!
                  </p>
                </div>
              </div>
              <img src={ArrowIcon} className="h-8 w-8 object-contain" alt="" />
            </div>

            <div className="w-full md:hidden">
              <BuyNowSection />
            </div>

            <div className="columns-2 gap-2 my-5 md:hidden">
              <button className="w-full flex items-center justify-center gap-2 bg-white shadow-md px-2 py-4 rounded-md">
                <img
                  src={YoutubeIcon}
                  className="w-5 h-5 object-contain"
                  alt=""
                />
                <span className="text-sm text-gray-600">App Guide Video</span>
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-white shadow-md px-2 py-4 rounded-md">
                <img src={WAIcon} className="w-5 h-5 object-contain" alt="" />
                <span className="text-sm text-gray-600">Help & Support</span>
              </button>
            </div>

            <div className="md:hidden">
              <ShareApp />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
