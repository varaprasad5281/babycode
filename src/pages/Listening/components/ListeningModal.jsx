import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { changeListeningModalStatus } from "../../../utils/redux/otherSlice";
import Avatar from "../../../assets/svg/avatar.svg";
import {
  MdThumbUp,
  MdOutlineThumbUp,
  MdThumbDown,
  MdOutlineThumbDown,
} from "react-icons/md";
import { LiaCommentSolid } from "react-icons/lia";
import { FiSend } from "react-icons/fi";
import ReactPlayer from "react-player/lazy";

const ListeningModal = () => {
  const dispatch = useDispatch();
  const playerRef = useRef(null);
  const [playerState, setPlayerState] = useState({
    playing: true,
    controls: true,
  });

  const closeModal = () => {
    dispatch(changeListeningModalStatus(false));
  };

  const handleRestart = () => {
    playerRef.current.seekTo(0);
    setPlayerState({
      playing: true,
      ...playerState,
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 200 }}
      className="relative bg-white rounded-lg px-4 pt-4 md:px-8 md:pt-8 flex flex-col z-20 w-[100%] sm:w-auto max-h-[90vh] overflow-scroll"
    >
      <div className="flex items-center justify-between border-b border-black/20 pb-2">
        <h3 className="font-medium">Listening Practice</h3>
        <button onClick={closeModal} className="text-2xl">
          <IoMdClose />
        </button>
      </div>

      <div className="h-[35vh] my-3 w-full">
        <ReactPlayer
          onStart={handleRestart}
          ref={playerRef}
          url="https://youtu.be/RzVvThhjAKw?si=B1ESxFfPnmRonQ6X"
          height="35vh"
          width="100%"
          playing={playerState.playing}
          controls={playerState.controls}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Comments</h4>
        <div className="bg-[#F2F2F2] p-2 text-sm">
          Remember to keep comments respectfull and to follow our community
          guidelines
        </div>
        <div>
          <div>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </div>
          <div className="sticky shadow-top z-20 pb-4 px-3 -bottom-0 left-0 w-full bg-white flex gap-4 items-center justify-between pt-3">
            <img
              src={Avatar}
              className="w-8 h-8 object-contain rounded-full"
              alt=""
            />
            <input
              type="text"
              placeholder="Add a comment"
              className="rounded-lg text-sm outline-none border border-black/30 p-2 w-full"
            />
            <button className="text-2xl text-primary-500">
              <FiSend />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ListeningModal;

const Comment = () => {
  return (
    <div className="flex flex-col p-2 border-b border-black/20 text-sm">
      <div className="flex gap-2 items-center">
        <img
          src={Avatar}
          className="w-6 h-6 object-contain rounded-full"
          alt=""
        />
        <span className="text-defaultGray">@username - 11/06/2023</span>
      </div>
      <div className="px-10">
        <p className="">Lorem ipsum dolor sit amet</p>
        <div className="flex gap-2 my-4">
          <button>
            <MdOutlineThumbUp className="text-xl" />
          </button>
          <button>
            <MdOutlineThumbDown className="text-xl" />
          </button>
          <button>
            <LiaCommentSolid className="text-xl" />
          </button>
        </div>
        <div className="cursor-pointer text-primary-500">
          <span>12 replies</span>
        </div>
      </div>
    </div>
  );
};
