import React, { useEffect, useRef, useState } from "react";
import profilePic from "../../assets/images/profile-icon.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PiCaretRightBold, PiCaretLeftBold } from "react-icons/pi";
import pi from "../../assets/images/a.png";
import "./index.css";
import Taskone from "./components/taskone";
import Tasktwo from "./components/tasktwo";
import { toast } from "react-hot-toast";
import { createJwt } from "../../utils/helpers";
import { getWritingCategorySubCategory } from "../../api/apiCall";
import { UserAuth } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { setLoading } from "../../utils/redux/otherSlice";

const Writing = () => {
  const [activeCategory, setCategory] = useState(0);
  const [activeType, setType] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const effectRan = useRef(true);
  const { errorLogout } = UserAuth();
  const [writingCategoryData, setWritingCategoryData] = useState([]);
  const [
    writingCategoryTask1AcademicData,
    setWritingCategoryTask1AcademicData,
  ] = useState([]);
  const [writingCategoryTask1GeneralData, setWritingCategoryTask1GeneralData] =
    useState([]);
  const [userAllGivenTest, setUserAllGivenTest] = useState([]);
  const dispatch = useDispatch();

  // get writing task data
  const getData = async () => {
    const user = JSON.parse(localStorage.getItem("userData"));
    try {
      dispatch(setLoading(true));
      const data = {
        uid: user.uid,
        platform: "web",
        uniqueDeviceId: localStorage.getItem("uniqueDeviceId") || "",
      };
      const encryptedData = createJwt(data);
      const formData = new FormData();
      formData.append("encrptData", encryptedData);
      const res = await getWritingCategorySubCategory(formData);
      if (!res.data.failure) {
        const data = res.data.data;
        setWritingCategoryData(data.WritingCategoryData);
        setWritingCategoryTask1AcademicData(
          data.WritingCategoryTask1AcademicData
        );
        setWritingCategoryTask1GeneralData(data.WritingCategoryTask1GenralData);
        setUserAllGivenTest(data.userAllGivenTest);
        sessionStorage.setItem(
          "prevWritingAnswers",
          JSON.stringify(data.userAllGivenTest)
        );
      } else {
        if (res.data.logout) {
          errorLogout(res.data.errorMessage);
        } else if (res.data.tokenInvalid) {
          toast.error(res.data.errorMessage);
        } else {
          toast.error(res.data.errorMessage);
        }
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (effectRan.current) {
      getData();
      effectRan.current = false;
    }
  }, []);
  return (
    <div className="w-full lg:max-h-screen overflow-scroll pb-5 bg-background">
      <header className="hidden p-2 px-[3rem] w-[100%] bg-white lg:flex justify-end sticky top-0 ">
        <Link to="/profile">
          {" "}
          <img src={profilePic} alt="." className="h-[30px] w-[30px]" />
        </Link>
      </header>
      <div className="bg-white">
        <div className="flex lg:hidden fixed z-10 w-full px-6 py-3 border-b border-black/10 bg-white">
          <div
            className="flex text-xl items-center gap-2 w-fit cursor-pointer"
            onClick={() => navigate("/")}
          >
            <PiCaretLeftBold />
            <h5 className="">Writing</h5>
          </div>
        </div>
      </div>
      <main className="px-8 pt-11 lg:py-[2.2rem]">
        <div className="hidden lg:flex items-center gap-2">
          <Link to="/">Home</Link> <PiCaretRightBold />{" "}
          <p className="text-primary-500">Writing</p>
        </div>
        <div className="pt-4 flex flex-col gap-5 ">
          <div className="button-group sm:w-full sm:grid sm:grid-cols-2">
            <button
              onClick={() => setCategory(0)}
              className={`category-button ${
                activeCategory === 0 && "active-button"
              }`}
            >
              Task 1
            </button>
            <button
              onClick={() => setCategory(1)}
              className={`category-button ${
                activeCategory === 1 && "active-button"
              }`}
            >
              Task 2{" "}
            </button>
          </div>
          <div className="">
            {activeCategory === 0 ? (
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
            ) : (
              <p className="text-[#DD6031]">
                Task 2 is same for Academic & General
              </p>
            )}
          </div>
          <div>
            {activeCategory === 0 ? (
              <Taskone
                writingCategoryTask1AcademicData={
                  writingCategoryTask1AcademicData
                }
                writingCategoryTask1GeneralData={
                  writingCategoryTask1GeneralData
                }
                activeSection={activeType}
              />
            ) : (
              <Tasktwo writingCategoryData={writingCategoryData} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Writing;
