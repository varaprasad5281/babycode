import React, { useState, useRef, useEffect } from "react";
import profilePic from "../../assets/images/profile-icon.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { PiCaretRightBold, PiCaretLeftBold } from "react-icons/pi";
import "./index.css";
import { checkAuth, createJwt } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { UserAuth } from "../../context/AuthContext";

import ReadingTest from "./components/readingTest";
import ImproveTest from "./components/improveTest";
import { setLoading } from "../../utils/redux/otherSlice";
import { toast } from "react-hot-toast";
import { getReadingData } from "../../api/apiCall";

const Reading = () => {
  const dispatch = useDispatch();
  const effectRan = useRef(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { category = "reading_tests" } = useParams();
  console.log(category);
  const [readingTestList, setReadingTestList] = useState([]);
  const [readingPractiseMaterials, setReadingPractiseMaterials] = useState([]);
  const [userAttendedTest, setUserAttendedTest] = useState([]);

  const [activeType, setType] = useState("academicTests");

  const { errorLogout } = UserAuth();
  const user = JSON.parse(localStorage.getItem("userData"));
  const uniqueDeviceId = localStorage.getItem("uniqueDeviceId");

  //fetch data
  const getData = async () => {
    if (checkAuth()) {
      //checking authentication
      try {
        dispatch(setLoading(true));
        const data = {
          uid: user.uid,
          platform: "web",
          uniqueDeviceId,
        };

        const encryptedData = createJwt(data);
        // console.log(encryptedData);
        const formData = new FormData();
        formData.append("encrptData", encryptedData);

        const response = await getReadingData(formData); //fetching reading data
        if (!response.data.failure) {
          console.log("2", response.data.data);
          // response: {failure: boolean,...}
          setReadingTestList(response.data.data?.ReadingTestList);
          setReadingPractiseMaterials(
            response.data.data?.readingPracticeMaterial
          );
          setUserAttendedTest(response.data.data?.userAttendedTest);
        } else {
          // console.log("1", response);
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
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  useEffect(() => {
    if (effectRan.current) {
      getData();
      effectRan.current = false;
    }
  }, []);
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
          Reading Practice
        </div>
      </div>
      <main className="p-4 px-6 ">
        <div className="flex items-center gap-2">
          <Link to="/">Home</Link> <PiCaretRightBold />{" "}
          <p className="text-primary-500">Reading</p>
        </div>
        <div className="pt-4 flex flex-col gap-5 ">
          <div className="button-group sm:w-full sm:grid sm:grid-cols-2">
            <Link
              to="/reading/reading_tests"
              className={`category-button ${
                category === "reading_tests" && "active-button"
              }`}
            >
              Reading Tests
            </Link>
            <Link
              to="/reading/improve_tests"
              className={`category-button ${
                category === "improve_tests" && "active-button"
              }`}
            >
              Improve Reading
            </Link>
          </div>
          <div className="">
            {category === "reading_tests" && (
              <div className=" IELTS-Button-group">
                <button
                  onClick={() => setType("academicTests")}
                  className={`Ielts-btn ${
                    activeType === "academicTests" && "active-Ielts-btn"
                  }`}
                >
                  Academic
                </button>
                <button
                  onClick={() => setType("generalTests")}
                  className={`Ielts-btn ${
                    activeType === "generalTests" && "active-Ielts-btn"
                  }`}
                >
                  General
                </button>
              </div>
            )}
          </div>
          <h2>
            {category === "reading_tests"
              ? "All the latest reading tests of this year have been uploaded, So start practicing now."
              : "Read Books, Shape Your Reading Skills!"}
          </h2>

          <div>
            {category === "reading_tests" ? (
              <>
                {readingTestList[activeType] && (
                  <ReadingTest
                    tests={readingTestList[activeType]}
                    attendedTests={userAttendedTest}
                    getData={getData}
                  />
                )}
              </>
            ) : (
              <>
                {readingPractiseMaterials && (
                  <ImproveTest materials={readingPractiseMaterials} />
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reading;
