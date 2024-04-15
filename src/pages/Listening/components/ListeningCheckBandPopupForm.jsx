import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { createJwt } from "../../../utils/helpers";
import { checkListeningTestBandScore } from "../../../api/apiCall";
import { UserAuth } from "../../../context/AuthContext";
import Notiflix from "notiflix";

const ListeningCheckBandPopupForm = ({
  changeModalStatus,
  selectedTest,
  setComments,
}) => {
  const [input, setInput] = useState("");
  const [inputErr, setInputErr] = useState("");
  const { errorLogout } = UserAuth();

  // handle check band input change
  const handleCheckBandInputChange = (e) => {
    const value = e.target.value;
    setInput(value.trim());
    if (e.target.value.trim() === "") {
      return setInputErr("Number is required");
    }
    if (!/^[0-9]+$/.test(value)) {
      return setInputErr("Please enter a number");
    }
    if (value > 0 && value < 41) {
      setInputErr("");
    } else {
      setInputErr("Please enter a number between 1-40");
    }
  };

  // submit the answer
  const submitAnswer = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("userData"));
    if (input.trim() !== "") {
      try {
        const data = {
          uid: user.uid,
          platform: "web",
          uniqueDeviceId: localStorage.getItem("uniqueDeviceId") || "",
          uniqueTestNumber: selectedTest.uniqueTestNumber,
          correctAnswerCount: input,
          userName: user.fullName || "",
        };

        const encryptedData = createJwt(data);
        const formData = new FormData();
        formData.append("encrptData", encryptedData);
        const response = await checkListeningTestBandScore(formData);
        if (!response.data.failure) {
          setComments(response.data.data.commentList);
          Notiflix.Confirm.show(
            "Band Score",
            "Your score is " + response.data.data.band,
            "Ok",
            "Cancel",
            function okCb() {
              changeModalStatus(false);
              setInput("");
            },
            function cancelCb() {
              changeModalStatus(false);
              setInput("");
            },
            {
              titleColor: "#135ADE",
              okButtonColor: "#ffffff",
              okButtonBackground: "#135ADE",
            }
          );
        } else {
          if (response.data.logout) {
            errorLogout(response.data.errorMessage);
          } else if (response.data.tokenInvalid) {
            toast.error(response.data.errorMessage);
          } else {
            toast.error(response.data.errorMessage);
          }
        }
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      setInputErr("Number is required");
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-screen h-[110vh] z-30 -translate-y-[10%] fixed bg-black/40 flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 200 }}
        transition={{ duration: 0.2, delay: 0.2 }}
        className="bg-white text-black p-4 rounded-xl w-[90vw] sm:w-[60vw] md:w-[40vw]"
      >
        <form onSubmit={submitAnswer} className="flex flex-col w-full gap-2">
          <h4 className="font-medium text-lg">
            Tell us how many answers are correct.
          </h4>
          <p className="text-sm">
            Video's last 15 seconds contain all the answers. Match your answers
            with them.
          </p>
          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="Correct answer between 1-40"
              className="p-2 outline-none border focus:border-primary-100 rounded-lg"
              value={input}
              onChange={handleCheckBandInputChange}
            />
            <small className="text-sm text-red-600 ml-2">{inputErr}</small>
          </div>
          <div className="w-full grid grid-cols-2 gap-3">
            <button className="primary-btn">Submit</button>
            <button
              className="secondary-btn"
              onClick={() => changeModalStatus(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ListeningCheckBandPopupForm;
