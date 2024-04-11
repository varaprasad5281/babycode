import React from "react";
import Popup from "reactjs-popup";
import book from "../../../assets/images/book-image.png";
import { RxCross2 } from "react-icons/rx";
import { FaRegStar } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";
const BuyModal = ({ e }) => (
  <Popup
    modal
    trigger={
      <button className="bg-[#1D46C9] text-white p-2 rounded-full">
        Buy Now
      </button>
    }
    position="right center"
  >
    <div className="flex flex-col gap-2">
      <div className="flex justify-between ">
        <p>Order Details</p>
        <RxCross2 />{" "}
      </div>
      <div className="flex bg-[#f3f6fa] gap-3 p-3">
        <div className=" rounded-lg  flex justify-center items-center">
          <img src={book} className="h-36 aspect-[2/1] w-auto" alt="." />
        </div>
        <div>
          <h1 className="font-[500] text-[14px]">
            Writing Test ( 2 Sets of paper)
          </h1>
          <p className="text-[#6B6A6A] text-[11px] ">
            Test is designed by expert teachers in their field. Its is designed
            according to the latest updates IELTS syllabus.
          </p>{" "}
          <p className="text-[10px] py-1 p-2 text-white w-fit bg-[#10b4a0]">
            By {e.author}
          </p>
        </div>{" "}
      </div>
      <div className="py-6 flex flex-col gap-3">
        <p className="">Payment Summary</p>
        <ul className=" text-[12px] flex flex-col gap-3">
          <li className="flex justify-between">
            <p className="#7B7B7B">Subtotal</p>
            <p className="flex items-center text-[#310D7B]">
              {" "}
              <LiaRupeeSignSolid /> 400{" "}
            </p>
          </li>
          <li className="flex justify-between">
            <p className="#7B7B7B">Memberships</p>
            <p className="flex items-center text-[#310D7B]">
              {" "}
              <LiaRupeeSignSolid /> 200{" "}
            </p>
          </li>
          <li className="flex justify-between">
            <p className="#7B7B7B">Taxes</p>
            <p className="flex items-center text-[#310D7B]">
              {" "}
              <LiaRupeeSignSolid /> 40{" "}
            </p>
          </li>
          <li className="flex justify-between border-t border-[#7b7b7b]">
            <p className="#7B7B7B">Total</p>
            <p className="flex items-center text-[#310D7B]">
              {" "}
              <LiaRupeeSignSolid /> 640{" "}
            </p>
          </li>
        </ul>

        <button className="bg-[#1D46C9] text-white p-2 rounded-full">
          Buy Now
        </button>
      </div>
    </div>
  </Popup>
);

export default BuyModal;
