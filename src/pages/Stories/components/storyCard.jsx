import React from "react";
import { FaPlay } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import ReactPlayer from "react-player";
import Popup from "reactjs-popup";
import "./index.css";

function StoryCard({ item }) {
  return (
    <Popup
      modal
      trigger={
        <div className="fr  shadow-md border border-[#e3e3e3b2] relative rounded-2xl overflow-hidden">
          <img className="" src={item.thumbnail} alt="." />
          <div className="absolute bottom-0 text-[12px] md:text-[13px] lg:text-[14px]  backdrop-blur-md text-white text-center w-full p-1">
            <p>{item.studentName}</p>
            <p>{item.bandScore}</p>
          </div>
          <div className="play absolute top-1/2 left-1/2 translate-x-[-50%] text-[16px] translate-y-[-50%] text-white p-3 bg-[#00000010] backdrop-blur-md rounded-full overflow-hidden ">
            <FaPlay />
          </div>
        </div>
      }
      position="right center"
    >
      {(close) => (
        <div className="h-full">
          <ReactPlayer
            width="auto"
            height="100%"
            controls
            url={item.videoURL}
          />
          <div className="absolute w-full p-3 bg-white left-0 top-0 z-10 flex items-center justify-between">
            <p className="flex items-center gap-3">Success Stories</p>
            <button onClick={close}>
              <RxCross2 />
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default StoryCard;
