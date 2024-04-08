import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GoBookmarkFill } from "react-icons/go";
import { CiBookmark } from "react-icons/ci";
import { PiCaretLeftBold } from "react-icons/pi";
import { HiSpeakerWave } from "react-icons/hi2";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const OffcanvasData = ({
  showOffcanvas,
  setShowOffcanvas,
}) => {
  const { vocabularyOffcanvasContent } = useSelector((state) => state.other);
  const selectedContent = vocabularyOffcanvasContent;
  const [saved, setSaved] = useState(selectedContent.savedStatus);
  const usageArray =
    selectedContent.resourceUsage?.split("\n").filter(Boolean) || [];

  useEffect(() => {
    setSaved(selectedContent.savedStatus);
  }, [selectedContent]);

  // function to handle speak
  const handleSpeak = () => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(selectedContent.resourceName);
      window.speechSynthesis.speak(speech);
    } else {
      toast("Speech synthesis is not supported in your browser.");
    }
  };

  // save vocabulary
  const handleSaveClick = () => {
    console.log("handleSaveClick");
    const savedData =
      JSON.parse(localStorage.getItem("savedVocabularies")) || [];
    savedData.push(selectedContent.resourceUniqueId);
    localStorage.setItem("savedVocabularies", JSON.stringify(savedData));
    setSaved(true);
  };

  // unsave vocabulary
  const handleUnsaveClick = () => {
    console.log("handleUnsaveClick");
    const savedData =
      JSON.parse(localStorage.getItem("savedVocabularies")) || [];
    const filteredData = savedData.filter(
      (data) => data !== selectedContent.resourceUniqueId
    );
    localStorage.setItem("savedVocabularies", JSON.stringify(filteredData));
    setSaved(false);
  };

  return (
    <motion.div
      animate={
        showOffcanvas ? { opacity: 1, zIndex: 30 } : { opacity: 0, zIndex: -1 }
      }
      initial={{ opacity: 0, zIndex: -1 }}
      exit={{ opacity: 0, zIndex: -1 }}
      transition={{ duration: 0.3 }}
      className="w-[100vw] max-h-[100vh] z-10 fixed left-0 top-0 flex bg-black/20"
    >
      {/* BACKGROUND */}
      <motion.div
        animate={showOffcanvas ? { opacity: 1 } : { opacity: 0 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="hidden lg:flex lg:w-[65vw]"
        onClick={() => setShowOffcanvas(false)}
      ></motion.div>

      {/* OFFCANVAS */}
      <motion.div
        animate={showOffcanvas ? { x: 0 } : { x: "calc(100vw + 50%)" }}
        initial={{ x: "calc(100vw + 50%)" }}
        exit={{ x: "calc(100vw + 50%)", duration: 0.3 }}
        transition={{ type: "tween", duration: 0.3 }}
        className="w-full lg:w-[35vw] h-[100vh] overflow-scroll bg-white shadow-left"
      >
        <div
          onClick={() => setShowOffcanvas(false)}
          className="sticky top-0 bg-white cursor-pointer text-xl lg:text-lg w-full px-6 py-3 border-b border-black/20 flex items-center gap-3"
        >
          <PiCaretLeftBold />
          <h5 className="lg:font-medium">{selectedContent.resourceName}</h5>
        </div>
        <div className="px-6 py-2 w-full flex justify-between items-center mt-3">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">
              {selectedContent.resourceName}
            </p>
            <span className="text-[#aaaaaa]">
              {selectedContent.resourceHindiDefination}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {saved ? (
              <button
                onClick={handleUnsaveClick}
                className="p-2 text-2xl w-10 h-10 flex justify-center items-center bg-white text-primary-500 shadow-lg rounded-full"
              >
                <GoBookmarkFill />
              </button>
            ) : (
              <button
                onClick={handleSaveClick}
                className="p-2 text-2xl w-10 h-10 flex justify-center items-center rounded-full bg-white shadow-lg"
              >
                <CiBookmark />
              </button>
            )}
            <button className="text-3xl text-primary-500" onClick={handleSpeak}>
              <HiSpeakerWave />
            </button>
          </div>
        </div>
        {selectedContent.resourceDefination && (
          <div className="px-6 my-6 flex flex-col gap-3">
            <div className="bg-[#FABB141C] p-1 w-fit">
              <h5 className="text-[#F48E3F]">Definition</h5>
            </div>
            <p>{selectedContent.resourceDefination}</p>
          </div>
        )}
        <div className="px-6 mt-8 flex flex-col gap-3 min-h-[30vh]">
          <div className="bg-[#1BCA991C] p-1 w-fit">
            <h5 className="text-[#1BCA99]">Examples</h5>
          </div>
          <ul className="flex flex-col gap-1">
            {usageArray?.length > 0 &&
              usageArray.map((item, idx) => (
                <li className="flex gap-2" key={idx}>
                  <p>{item}</p>
                </li>
              ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OffcanvasData;
