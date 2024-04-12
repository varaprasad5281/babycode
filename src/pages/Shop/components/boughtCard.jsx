import { FaRupeeSign } from "react-icons/fa";
import book from "../../../assets/images/book-image.png";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaLock, FaCheckCircle } from "react-icons/fa";
import {} from "react-icons/fa";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useState } from "react";
import { PiCaretLeftBold } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import RateModal from "./RateModal";
import BuyModal from "./BuyModal";

const data = [
  {
    author: "Ramanadeep Sharma",
    title: "Best Speaking Practice(+2 Classes)",
    price: "1000",
    actualprice: "1200",
    image: book,
  },
  {
    author: "Ramanadeep Sharma",
    title: "Best Speaking Practice(+2 Classes)",
    price: "1000",
    actualprice: "1200",
    image: book,
  },
];

const Boughtcard = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] md:grid-cols-[repeat(3,minmax(280px,1fr))] pt-5 gap-4 flex-wrap">
      {data.map((e, i) => (
        <div
          key={i}
          className="p-3 shadow bg-gradient-to-t relative rounded-2xl overflow-hidden from-[#cbf0eb] to-[#f4fefb]"
        >
          <p className="text-[10px] py-1 p-2 text-white w-fit bg-[#10B4A0]">
            By {e.author}
          </p>
          <div className="flex gap-3">
            <div className="py-2">
              <h1 className="text-[16px] font-[500]">{e.title}</h1>
            </div>
            <div>
              <img src={e.image} className="h-24" />
            </div>
          </div>
          <p className=" w-fit text-[11px] flex gap-1.5 p-1 px-4 rounded-full items-center ">
            <FaCheckCircle color="#01B5D6" size={18} /> Already purchased
          </p>
        </div>
      ))}
    </div>
  );
};

export default Boughtcard;
