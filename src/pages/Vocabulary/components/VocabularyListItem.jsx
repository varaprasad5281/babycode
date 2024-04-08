import React from "react";
import { PiCaretRightBold } from "react-icons/pi";

const VocabularyListItem = ({
  vocabulary,
  idx,
  setSelectedVocabularyCategory,
  setShowVocabularyCategoryData,
}) => {
  const handleVocabularyClick = () => {
    setSelectedVocabularyCategory(vocabulary);
    setShowVocabularyCategoryData(true);
  };
  return (
    <div
      onClick={handleVocabularyClick}
      className={`${
        idx % 2 === 0 ? "bg-white" : "bg-transparent"
      } bg-white cursor-pointer flex flex-row sm:items-center justify-between px-5 py-3 shadow-sm`}
    >
      <div className="flex flex-col gap-1">
        <p className="text-md font-medium">
          {vocabulary.vocabularyCategoryName}
        </p>
      </div>
      <button className="">
        <PiCaretRightBold />
      </button>
    </div>
  );
};

export default VocabularyListItem;
