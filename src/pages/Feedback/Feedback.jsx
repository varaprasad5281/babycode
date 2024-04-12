import React, { useState } from "react";
import profilePic from "../../assets/images/profile-icon.png";
import feedback from "../../assets/images/feedback.png";
import UnderDevelopment from "../../components/UnderDevelopment";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
const Feedback = () => {
  const navigate = useNavigate();

  const [feedvalue, setFeedvalue] = useState("");

  return (
    <div className="w-full lg:max-h-screen overflow-scroll pb-5 gr bg-background ">
      <header className="hidden p-2 px-4 w-[100%] bg-white lg:flex justify-end z-10 sticky top-0 ">
        <img src={profilePic} alt="." className="h-[30px] w-[30px]" />
      </header>
      <div className="bg-white sticky top-0 z-10">
        <div className="flex gap-2 items-center p-3 lg:hidden">
          <button onClick={() => navigate(-1)}>
            <PiCaretLeftBold />
          </button>{" "}
          Feedback
        </div>
      </div>
      <main className="p-4 px-4 md:px-6 lg:px-8 ">
        <div className="flex items-center gap-2">
          <Link to="/feedback">Feedback</Link> <PiCaretRightBold />{" "}
          <p className="text-primary-500">Feedback</p>
        </div>
        <div className="pt-6 flex flex-col gap-4 items-start">
          <img className="h-24 w-auto" src={feedback} alt="." />
          <h1 className="gr-text text-[16px] md:text-[18px] font-[500]">
            We appreciate your feedback, Let us know what you think about the
            app
          </h1>
          <p className="text-[#6B6A6A] text-[14px] md:text-[16px]">
            Send us your feedback, we’ll work on it{" "}
          </p>
          <form action="#" className="w-full">
            <textarea
              onChange={(e) => setFeedvalue(e.target.value)}
              placeholder="Please report an issue or request a feature"
              rows={10}
              className="border-[1px] outline-none border-[#D7D5D5] rounded-lg p-2  h-auto overflow-auto  w-full "
            ></textarea>
            <button
              type="submit"
              disabled={!feedvalue}
              className="  float-end mt-3 bg-[#135ADE] shadow-lg text-white py-2 p-3 rounded-full disabled:bg-[#135ADE52]"
            >
              Send feedback
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Feedback;
