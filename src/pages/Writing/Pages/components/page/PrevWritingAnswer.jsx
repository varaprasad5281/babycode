import React, { useState } from "react";
import ProfileIcon from "../../../../../assets/images/profile-icon.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

const PrevWritingAnswers = () => {
  const navigate = useNavigate();
  const { category, subcategory, questionId } = useParams();
  const answersData = JSON.parse(sessionStorage.getItem("prevWritingAnswers"));
  const prevAnswer = answersData.find(
    (question) => question.QuestionUniqueId === questionId
  );
  const [testResult, setTestResult] = useState(
    prevAnswer.Result.split("\n") || []
  );

  let backPageUrl;
  if (subcategory !== undefined) {
    backPageUrl = `/writing/${category}/${subcategory}/Question`;
  } else {
    backPageUrl = `/writing/${category}/Question`;
  }

  return (
    <div className="w-full lg:max-h-screen bg-background overflow-scroll pb-5">
      <div className="sticky z-10 left-0 top-0 hidden lg:flex justify-end items-center py-[0.4rem] w-full bg-white">
        <div className="items-center gap-6 px-[3rem]">
          <div className="p-[.2rem] rounded-full cursor-pointer">
            <img
              src={ProfileIcon}
              alt=""
              className="w-8 h-8 object-contain rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="flex lg:hidden fixed z-10 w-full px-6 py-3 border-b border-black/10 bg-white">
        <Link
          to={backPageUrl}
          className="flex text-xl items-center gap-2 w-fit cursor-pointer"
        >
          <PiCaretLeftBold />
          <h5 className="">Previous Answers / Results</h5>
        </Link>
      </div>

      <div className="w-full lg:py-[2rem] overflow-scroll">
        <div className="hidden lg:flex items-center gap-2 px-6 lg:px-[2rem]">
          <Link to="/">Home</Link>
          <PiCaretRightBold />
          <Link to="/writing">Writing</Link>
          <PiCaretRightBold />
          <Link to={`/writing/${category}`}>{category}</Link>
          <PiCaretRightBold />
          {subcategory !== undefined && (
            <>
              <Link to={`/writing/${category}/${subcategory}`}>
                {subcategory}
              </Link>
              <PiCaretRightBold />
            </>
          )}
          <Link
            to={`/writing/${category}${
              subcategory !== undefined ? "/" + subcategory : ""
            }/Question`}
          >
            Question
          </Link>
          <PiCaretRightBold />
          <Link className="text-primary-500">Previous Answers / Results</Link>
        </div>

        <div className="px-6 lg:px-[2rem] mt-[4rem] lg:mt-6">
          <div className="flex flex-col gap-4 bg-white p-4 rounded-md">
            <div className="flex flex-col gap-2 border-b pb-5">
              <div className="bg-primary-50 p-2 rounded-md w-fit text-primary-500">
                Result / Band
              </div>
              <div className="flex flex-col gap-1">
                {testResult.length > 0 &&
                  testResult.map((text, i) => <p key={i}>{text}</p>)}
              </div>
            </div>
            <div className="flex flex-col gap-2 pb-5">
              <div className="bg-primary-50 p-2 rounded-md w-fit text-primary-500">
                Answer 1
              </div>
              <p>
                {prevAnswer.Answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrevWritingAnswers;
