import React from "react";
import Popup from "reactjs-popup";

import "./index.css";
import { FiEdit3 } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";

function ModalCard({ details, children }) {
  const { categroy, value, action } = details;
  return (
    <Popup
      modal
      trigger={
        <button className="bg-white  text-start p-2 p-3 md:px-5 flex justify-between transition-all duration-100 items-center hover:shadow-md hover:scale-[102%] ">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-[#6B6A6A]  ">{categroy}</p>
            <p className="text-lg">{value}</p>
          </div>
          {action === "edit" ? (
            <FiEdit3 className="text-2xl text-[#B5B5B5] hover:bg-gray-100 p-2 box-content rounded" />
          ) : (
            <MdKeyboardArrowRight className="text-2xl text-[#B5B5B5] hover:bg-gray-100 p-2 box-content rounded" />
          )}
        </button>
      }
      position="right center"
    >
      {children}
    </Popup>
  );
}

export default ModalCard;
