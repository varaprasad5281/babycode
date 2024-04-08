import { color } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
// import pi from "../../../assets/images/a.png";

function Taskonecard({ item }) {
  const { color, title, icon } = item;
  return (
    <Link
      to={`/writing/${title}`}
      style={{ "--c1": color, "--c2": color + "76" }}
      className="p-6 hover:scale-[103%] shadow-lg transition-all bg-gradient-to-b from-[var(--c2)] to-[var(--c1)] rounded-lg flex flex-col gap-3 justify-center text-center items-center"
    >
      <img
        className="bg-white p-1 rounded-full h-[30px] aspect-[1/1]"
        src={icon}
        alt="."
      />
      <p className="font-[500] text-white">{title}</p>
    </Link>
  );
}

export default Taskonecard;
