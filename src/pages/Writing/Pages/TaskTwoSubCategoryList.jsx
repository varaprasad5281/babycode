import React from "react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { Link, useNavigate, useParams } from "react-router-dom";
import profilePic from "../../../assets/images/profile-icon.png";
import NoData from "../../../components/NoData";

const TaskTwoSubCategoryList = () => {
  const navigate = useNavigate();
  const { category } = useParams();

  const subcategories =
    JSON.parse(sessionStorage.getItem("writingSubcategories")) || [];
  const prevAnswers =
    JSON.parse(sessionStorage.getItem("prevWritingAnswers")) || [];

  if (!subcategories.length || !prevAnswers.length) {
    return <NoData prevUrl={"/writing"} urlLabel={"Writing"} />;
  }
  return (
    <div className="w-full lg:max-h-screen overflow-scroll pb-5 bg-background">
      <header className="hidden p-2 px-4 w-[100%] bg-white lg:flex justify-end sticky top-0 ">
        <img src={profilePic} alt="." className="h-[30px] w-[30px]" />
      </header>
      <div className="flex flex-col">
        <div className="flex lg:hidden fixed z-10 w-full px-6 py-3 border-b border-black/10 bg-white">
          <div
            className="flex text-xl items-center gap-2 w-fit cursor-pointer"
            onClick={() => navigate("/writing")}
          >
            <PiCaretLeftBold />
            <h5 className="">{category}</h5>
          </div>
        </div>

        <div className="w-full lg:py-[2.2rem] overflow-scroll">
          <div className="hidden lg:flex items-center gap-2 px-6 lg:px-[2rem]">
            <Link to="/">Home</Link>
            <PiCaretRightBold />
            <Link to="/writing">Writing</Link>
            <PiCaretRightBold />
            <Link className="text-primary-500">{category}</Link>
          </div>
        </div>

        <div className="flex flex-col gap-1 pt-[4rem] lg:pt-0 sm:px-6 lg:px-[2rem]">
          {subcategories.length > 0 &&
            subcategories.map((item) => (
              <Link
                to={`/writing/${category}/${item.SubCategoryName}`}
                key={item.id}
                className="bg-white cursor-pointer flex flex-row sm:items-center justify-between px-5 py-3 shadow-sm"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-md font-medium">{item.SubCategoryName}</p>
                </div>
                <button className="">
                  <PiCaretRightBold />
                </button>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TaskTwoSubCategoryList;
