import { color } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
// import pi from "../../../assets/images/a.png";

function Taskonecard({ item }) {
  return (
    <Link
      to={`/writing/${item.CategoryName}`}
      // style={{ "--c1": color, "--c2": color + "76" }}
      className="relative px-10 hover:scale-[103%] h-[10rem] sm:h-[11rem] transition-all bg-gradient-to-b from-[var(--c2)] to-[var(--c1)] rounded-3xl flex flex-col gap-3 justify-end text-center items-center"
    >
      <img
        className="p-1 h-[10rem] sm:h-[11rem] aspect-video object-cover object-top rounded-3xl absolute left-0 top-0 w-full"
        src={item.thumbnail}
        alt="."
      />
      <p className="font-[500] text-white mb-5 z-10">{item.CategoryName}</p>
    </Link>
  );
}

export default Taskonecard;
