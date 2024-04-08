import React, { useState } from "react";
import profilePic from "../../assets/images/profile-icon.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PiCaretRightBold, PiCaretLeftBold } from "react-icons/pi";
import "./index.css";
import ReadingTest from "./components/readingTest";
import ImproveTest from "./components/improveTest";

const Reading = () => {
  const [activeCategory, setCategory] = useState(0);
  const [activeType, setType] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-full lg:max-h-screen overflow-scroll pb-5 bg-background ">
      <header className="hidden p-2 px-4 w-[100%] bg-white lg:flex justify-end sticky top-0 ">
        <img src={profilePic} alt="." className="h-[30px] w-[30px]" />
      </header>
      <div className="bg-white">
        <div className="flex gap-2 items-center p-2 lg:hidden">
          <button onClick={() => navigate(-1)}>
            <PiCaretLeftBold />
          </button>{" "}
          Reading Practice
        </div>
      </div>
      <main className="p-4 px-6">
        <div className="flex items-center gap-2">
          <Link to="/">Home</Link> <PiCaretRightBold />{" "}
          <p className="text-primary-500">Reading</p>
        </div>
        <div className="pt-4 flex flex-col gap-5 ">
          <div className="button-group sm:w-full sm:grid sm:grid-cols-2">
            <button
              onClick={() => setCategory(0)}
              className={`category-button ${
                activeCategory === 0 && "active-button"
              }`}
            >
              Reading Tests
            </button>
            <button
              onClick={() => setCategory(1)}
              className={`category-button ${
                activeCategory === 1 && "active-button"
              }`}
            >
              Improve Reading
            </button>
          </div>
          <div className="">
            <div className=" IELTS-Button-group">
              <button
                onClick={() => setType(0)}
                className={`Ielts-btn ${
                  activeType === 0 && "active-Ielts-btn"
                }`}
              >
                Academic
              </button>
              <button
                onClick={() => setType(1)}
                className={`Ielts-btn ${
                  activeType === 1 && "active-Ielts-btn"
                }`}
              >
                General
              </button>
            </div>
          </div>
          <h2>
            All the latest reading tests of this year have been uploaded, So
            start practicing now.
          </h2>
          <div>{activeCategory === 0 ? <ReadingTest /> : <ImproveTest />}</div>
        </div>
      </main>
    </div>
  );
};

export default Reading;
