import React from "react";
import Popup from "reactjs-popup";
import book from "../../../assets/images/book-image.png";
import { RxCross2 } from "react-icons/rx";
import { FaRegStar, FaStar } from "react-icons/fa";
const RateModal = ({ e }) => (
  <Popup
    modal
    trigger={
      <button className="border border-[#EBEAED] text-[#135ADE] p-1 px-3">
        Rate us
      </button>
    }
    position="right center"
  >
    <div className="flex flex-col gap-2">
      <div className="flex justify-between ">
        <p>Rate Book</p>
        <RxCross2 />{" "}
      </div>
      <div className="bg-[#f3f6fa] rounded-lg p-3 flex justify-center items-center">
        <img src={book} className="h-36" alt="." />
      </div>
      <p className="text-[10px] py-1 p-2 text-white w-fit bg-[#10b4a0]">
        By {e.author}
      </p>
      <div>
        <h1 className="font-[500]">Writing Test ( 2 Sets of paper)</h1>
        <p className="text-[#6B6A6A]">
          Test is designed by expert teachers in their field. Its is designed
          according to the latest updates IELTS syllabus.
        </p>
      </div>
      <div className="py-6 flex flex-col gap-3">
        <p className="text-center text-[12px]">How was your experience?</p>
        <div className="cr flex gap-3 justify-center text-[20px]">
          <span>
            <FaRegStar className="non-check-star" />
            <FaStar className="check-star" />
          </span>
          <span>
            <FaRegStar className="non-check-star" />
            <FaStar className="check-star" />
          </span>
          <span>
            <FaRegStar className="non-check-star" />
            <FaStar className="check-star" />
          </span>
          <span>
            <FaRegStar className="non-check-star" />
            <FaStar className="check-star" />
          </span>
          <span>
            <FaRegStar className="non-check-star" />
            <FaStar className="check-star" />
          </span>
        </div>
        <textarea
          className="resize-none p-2 w-full border rounded-2xl border-[#D7D5D5] "
          placeholder="Write feedback here.."
          rows={4}
        ></textarea>
        <button className="bg-[#1D46C9] text-white p-2 rounded-full">
          Submit
        </button>
      </div>
    </div>
  </Popup>
);

export default RateModal;
