import React from "react";
import ProfileIcon from "../../../../../assets/images/profile-icon.png";
import { Link, useParams } from "react-router-dom";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import NoData from "../../../../../components/NoData";

const PrevWritingAnswers = () => {
  const { category, subcategory, questionId } = useParams();
  const answersData =
    JSON.parse(sessionStorage.getItem("prevWritingAnswers")) || [];
  const prevAnswer = answersData.find(
    (question) => question?.QuestionUniqueId === questionId
  );

  let backPageUrl;
  if (subcategory !== undefined) {
    backPageUrl = `/writing/${category}/${subcategory}/Question`;
  } else {
    backPageUrl = `/writing/${category}/Question`;
  }

  if (!answersData || !prevAnswer) {
    return <NoData prevUrl={"/writing"} urlLabel={"Writing"} />;
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
          <h5 className="">Previous Answer / Result</h5>
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
          <Link className="text-primary-500">Previous Answer / Result</Link>
        </div>

        <div className="px-6 lg:px-[2rem] mt-[4rem] lg:mt-6">
          <div className="flex flex-col gap-4 bg-white p-4 rounded-md">
            <div className="flex flex-col gap-2 border-b pb-5">
              <div className="bg-primary-50 p-2 rounded-md w-fit text-primary-500">
                Result / Band
              </div>
              <p className="whitespace-pre-line">{prevAnswer?.Result}</p>
            </div>
            <div className="flex flex-col gap-2 pb-5">
              <div className="bg-primary-50 p-2 rounded-md w-fit text-primary-500">
                Answer 1
              </div>
              <p>{prevAnswer?.Answer}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrevWritingAnswers;
