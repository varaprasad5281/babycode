import React from "react";
import ListeningVideoImg from "../../../assets/images/listening-test-video.png";
import { TbExternalLink } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { changeListeningModalStatus } from "../../../utils/redux/otherSlice";

const ListeningTests = () => {
  return (
    <div className="flex flex-col gap-3 px-6 lg:px-[3rem]">
      <Test />
      <Test />
      <Test />
      <Test />
      <Test />
      <Test />
      <Test />
    </div>
  );
};

export default ListeningTests;

const Test = () => {
  const dispatch = useDispatch();

  const handleStartClick = () => {
    dispatch(changeListeningModalStatus(true));
  };
  return (
    <div className="w-full shadow-sm">
      <div className="relative bg-white px-5 gap-2 py-3 flex items-center justify-between">
        <div className="lg:hidden absolute py-2 px-6 flex gap-1 items-center left-0 top-0 rounded-ee-2xl bg-[#135ADE] text-white">
          <span className="text-sm">Latest</span>
        </div>
        <div className="flex flex-col gap-2 w-full lg:w-fit">
          <div className="flex gap-4 lg:gap-2 items-center">
            <img
              src={ListeningVideoImg}
              className="w-40 lg:w-auto lg:aspect-video object-cover"
              alt=""
              loading="lazy"
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-md font-medium">
                IELTS Listening practice test | Ep: 329
              </h3>
              <div className="hidden lg:flex bg-[#f9dc5c2d] p-1 rounded-sm w-fit">
                <span className="text-[#BB9B0B] text-sm">
                  You haven’t taken the test yet.
                </span>
              </div>
              <span className="lg:hidden text-[#AAAAAA]">3 hrs ago</span>
            </div>
          </div>
        </div>
        <span className="hidden lg:flex text-[#AAAAAA] text-sm">
          March 12, 2023 - 5:34 PM
        </span>
        <button
          onClick={handleStartClick}
          className="hidden lg:flex bg-primary-50 text-primary-500 hover:bg-primary-100 hover:text-primary-50 transition-colors duration-300 py-2 px-3 rounded-full font-medium"
        >
          Start Test
        </button>
        {/* <div className="lg:hidden absolute p-2 flex gap-1 items-center right-0 bottom-0 rounded-ss-2xl bg-[#008A64] text-white">
          <div className="p-1 w-[1rem] h-[1rem] flex items-center text-sm justify-center rounded-full bg-white text-[#008A64]">
            ✔
          </div>
          <span className="text-sm">Completed</span>
        </div> */}
      </div>
      <div className="lg:hidden bg-[#F9DC5C30] p-2 w-full">
        <div className="flex justify-between">
          <small className="text-sm">You haven’t taken this test yet.</small>
          <div
            className="text-primary-500 flex items-center gap-1 cursor-pointer"
            onClick={handleStartClick}
          >
            <span>Start Test</span>
            <TbExternalLink />
          </div>
        </div>
      </div>
    </div>
  );
};
