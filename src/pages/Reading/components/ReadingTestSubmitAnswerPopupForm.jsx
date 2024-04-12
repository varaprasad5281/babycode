import React from "react";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";

const ReadingTestSubmitAnswerPopupForm = ({ closePopup }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="w-full h-full fixed top-0 left-0 z-50 bg-black/40 flex justify-center items-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.2 }}
        className="w-fit h-fit bg-white rounded-lg flex flex-col gap-2"
      >
        <div className="flex justify-end py-4 pr-4 border-b">
          <button className="text-2xl w-fit self-end" onClick={closePopup}>
            <MdClose />
          </button>
        </div>
        <div className="px-10 py-6 max-w-md flex flex-col items-center gap-3">
          <h4 className="text-lg font-medium">
            Tell us how many answers are correct?
          </h4>
          <div className="bg-[rgba(244,141,63,0.19)] text-[#DD6031] flex gap-2 p-2">
            <BsInfoCircle className="text-2xl" />
            <p className="text-sm">
              End of test contains all answer, match your answer with those
              answers
            </p>
          </div>
          <input
            type="text"
            className="outline-none py-2 px-4 border w-full rounded-full"
            placeholder="Correct answer between 1-40"
          />
          <button className="primary-btn w-fit mt-2">Submit</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReadingTestSubmitAnswerPopupForm;
