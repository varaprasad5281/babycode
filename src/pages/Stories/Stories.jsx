import React from "react";
import UnderDevelopment from "../../components/UnderDevelopment";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import profilePic from "../../assets/images/profile-icon.png";
import { Link, useNavigate } from "react-router-dom";

const Stories = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full lg:max-h-screen overflow-scroll pb-5 bg-background ">
      <header className="hidden p-2 px-4 w-[100%] bg-white lg:flex justify-end z-10 sticky top-0 ">
        <img src={profilePic} alt="." className="h-[30px] w-[30px]" />
      </header>
      <div className="bg-white sticky top-0 z-10">
        <div className="flex gap-2 items-center p-3 lg:hidden">
          <button onClick={() => navigate(-1)}>
            <PiCaretLeftBold />
          </button>{" "}
          Stories
        </div>
      </div>
      <main className="p-4 px-6 ">
        <div className="flex items-center gap-2">
          <Link to="/stories">Stories</Link> <PiCaretRightBold />{" "}
          <p className="text-primary-500">Stories</p>
        </div>
      </main>
    </div>
  );
};

export default Stories;
