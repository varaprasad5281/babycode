import { PiCaretRight } from "react-icons/pi";
import reading from "../../../assets/images/reading-image.png";
import { Document, Page } from "@react-pdf/renderer";
import { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Link, useParams } from "react-router-dom";

const ReadingPractice = ({ item }) => {
  console.log(item);
  const { category } = useParams();
  const [isOpen, setIsOpen] = useState(false); // State for popup visibility

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Link
      to={`/reading/${category}/material`}
      state={{ item }}
      className="test-card w-full"
    >
      <button className="test-card w-full" type="button" onClick={() => {}}>
        <div className="flex gap-2">
          <img
            className="md:aspect-[2/1] object-contain aspect-[1.5/1] h-[70px]"
            src={item.thumbnail}
            alt="."
          />
          <div>
            <div className=" px-1 md:px-2 w-fit text-[#4bb3d6] rounded-full lg:text-[14px] text-[12px] font-[600]">
              Book
            </div>
            <h2 className="font-[500] text-[13px] lg:text-[16px]  ">
              {item.name}
            </h2>
            <p className="text-defaultGray text-[11px] lg:text-[16px]"> </p>
          </div>
        </div>
        <div>
          <div>
            <PiCaretRight />
          </div>
        </div>
      </button>
    </Link>
  );
};

export default ReadingPractice;
