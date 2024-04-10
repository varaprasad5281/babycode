import { color } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
// import pi from "../../../assets/images/a.png";

function Taskonecard({ item }) {
  return (
    <Link
      to={`/writing/${item.CategoryName}`}
      // style={{ "--c1": color, "--c2": color + "76" }}
      className="relative px-10 bg-cover bg-top hover:scale-[103%] w-full h-[9rem] transition-all bg-gradient-to-b from-[var(--c2)] to-[var(--c1)] rounded-3xl flex flex-col gap-3 justify-end text-center items-center"
      style={{backgroundImage:`url(${item.thumbnail})`}}
    >
      <p className="font-[500] text-white mb-5 z-10 text-sm sm:text-md">
        {item.CategoryName}
      </p>
    </Link>
  );
}

export default Taskonecard;
