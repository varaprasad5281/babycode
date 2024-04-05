import React from "react";
import { PiCaretRightBold } from "react-icons/pi";

const VocabularyCategoryItem = ({
  vocabulary,
  setShowOffcanvas,
  setSelectedContent,
}) => {
  const handleOffcanvasShow = () => {
    setSelectedContent(vocabulary);
    setShowOffcanvas(true);
  };
  return (
    <div
      onClick={handleOffcanvasShow}
      className={`bg-white cursor-pointer flex flex-row sm:items-center justify-between px-5 py-3 shadow-sm`}
    >
      <div className="flex flex-col gap-1">
        <p className="text-md font-medium">{vocabulary.resourceName}</p>
        <span className="text-[#AAAAAA] text-sm">
          {vocabulary.resourceDefination}
        </span>
      </div>
      <button className="">
        <PiCaretRightBold />
      </button>
    </div>
  );
};

export default VocabularyCategoryItem;
