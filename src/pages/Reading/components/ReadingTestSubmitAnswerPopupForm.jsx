import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { toast } from "react-hot-toast";

const ReadingTestSubmitAnswerPopupForm = ({ closePopup, test }) => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const [answer, setAnswer] = useState("");
  const [answerErr, setAnswerErr] = useState("");

  // handle check band input change
  const handleCheckBandInputChange = (e) => {
    const value = e.target.value;
    setAnswer(value.trim());
    if (e.target.value.trim() === "") {
      return setAnswerErr("Number is required");
    }
    if (!/^[0-9]+$/.test(value)) {
      return setAnswerErr("Please enter a number");
    }
    if (value > 0 && value < 41) {
      setAnswerErr("");
    } else {
      setAnswerErr("Please enter a number between 1-40");
    }
  };

  // submit the answer
  const checkBandScore = async () => {
    try {
      const data = {
        uid: user.uid,
        platform: "web",
        uniqueDeviceId:
          localStorage.getItem("uniqueDeviceId") || "",
        uniqueTestNumber: test.uniqueTestNumber,
        correctAnswerCount: answer,
        userName: user.fullName,
      };

      console.log({user})
      console.log({data})
    } catch (err) {
      toast.error(err.message);
    }
  };
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
            value={answer}
            onChange={handleCheckBandInputChange}
          />
          <button onClick={checkBandScore} className="primary-btn w-fit mt-2">
            Submit
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReadingTestSubmitAnswerPopupForm;
