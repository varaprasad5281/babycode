import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import profilePic from "../../../../../assets/images/profile-icon.png";
import { useState } from "react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import data from "../questionsData";
import QuestionCard from "../questionCard";
import { FaRegLightbulb } from "react-icons/fa";
import { RiEdit2Line } from "react-icons/ri";

const Question = () => {
  const [activeCategory, setCategory] = useState(0);
  const [activeType, setType] = useState(0);
  const { category } = useParams();
  const navigate = useNavigate();
  const questionData = JSON.parse(sessionStorage.getItem("writingQuestion"));
  console.log(questionData);

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
          Writing
        </div>
      </div>
      <main className="p-4 px-2 sm:px-4 md:px-8">
        <div className="flex flex-wrap gap-3 text-[11px] md:text-[14px] justify-between items-center">
          <div className="flex  items-center gap-2">
            <Link to="/">Home</Link> <PiCaretRightBold />{" "}
            <Link to="/writing">Writing</Link> <PiCaretRightBold />{" "}
            <Link to={`/writing/${category}`}>{category}</Link>{" "}
            <PiCaretRightBold /> <p className="text-primary-500">Question</p>
          </div>
        </div>
        <div className="pt-8">
          <div className="bg-white p-3 md:p-4 flex flex-col gap-3">
            <p className="w-fit p-1 text-[12px] bg-gradient-to-r from-[#3dc8ca] to-[#04a4e9] text-white rounded-md mb-2 ">
              Question
            </p>
            <p className="text-[13px]">{questionData?.Question}</p>
            <div className="flex gap-6 ">
              <button className="flex gap-1 md:gap-2 items-center text-[11px] md:text-[12px] bg-[#FCF300] border-[#FCF300]  p-2 border rounded-full">
                <FaRegLightbulb /> View Best Answer
              </button>
              <button className="flex gap-1 md:gap-2 items-center text-[11px] md:text-[12px]  border rounded-full border-[#1D46C9] text-[#1D46C9] p-2">
                <RiEdit2Line /> Write Your Answer
              </button>
            </div>
            <textarea
              rows="10"
              placeholder="Start typing..."
              className="bg-[#F1F5F9] rounded-lg  max-w-[100%] p-3"
            ></textarea>
            <button className="bg-[#1d46c9] w-fit text-white p-2 px-3 rounded-full">
              Submit & Check Band Score
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Question;
