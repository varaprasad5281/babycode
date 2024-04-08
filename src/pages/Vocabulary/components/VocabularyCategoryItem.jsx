import React from "react";
import { PiCaretRightBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setVocabularyOffcanvasContent } from "../../../utils/redux/otherSlice";
import { GoBookmarkFill } from "react-icons/go";

const VocabularyCategoryItem = ({ vocabulary, setShowOffcanvas }) => {
  const savedList = JSON.parse(localStorage.getItem("savedVocabularies")) || [];
  const dispatch = useDispatch();
  const handleOffcanvasShow = () => {
    const data = {
      ...vocabulary,
      savedStatus: savedList.includes(vocabulary.resourceUniqueId),
    };
    dispatch(setVocabularyOffcanvasContent(data));
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
      <div className="flex gap-2 items-center">
        {savedList.includes(vocabulary.resourceUniqueId) && <GoBookmarkFill className="text-primary-500"/>}
        <button className="">
          <PiCaretRightBold />
        </button>
      </div>
    </div>
  );
};

export default VocabularyCategoryItem;
