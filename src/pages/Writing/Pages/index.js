import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import profilePic from "../../../assets/images/profile-icon.png";
import { useState } from "react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import QuestionBank from "./components/questionBank";
import data from "./components/questionsData";
import QuestionCard from "./components/questionCard";

const WritingQBank = () => {
  const [activeCategory, setCategory] = useState(0);
  const [activeType, setType] = useState(0);
  const { category } = useParams();
  //   const location = useLocation();
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
          Writing
        </div>
      </div>
      <main className="p-4 px-5 md:px-8">
        <div className="flex items-center gap-2">
          <Link to="/">Home</Link> <PiCaretRightBold />{" "}
          <Link to="/writing">Writing</Link> <PiCaretRightBold />{" "}
          <p className="text-primary-500">{category}</p>
        </div>
        <div className="pt-8 text-[12px] md:text-[14px] ">
          {data.map((e, i) => (
            <QuestionCard category={category} item={e} key={i} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default WritingQBank;
