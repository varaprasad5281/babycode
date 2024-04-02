import React, { lazy, useEffect, useState } from "react";
import ProfileIcon from "../../assets/images/profile-icon.png";
import Speaking from "../../assets/images/speaking.png";
import Listening from "../../assets/images/listening.png";
import Reading from "../../assets/images/reading.png";
import Writing from "../../assets/images/writing.png";
import Vocalbulary from "../../assets/images/vocabulary.png";
import Classes from "../../assets/images/classes.png";
import BookIelts from "../../assets/images/book-ielts.png";
import StudentNews from "../../assets/images/student-news.png";
import YoutubeIcon from "../../assets/images/youtube-icon.png";
import IGIcon from "../../assets/images/instagram-icon.png";
import ListImg from "../../assets/images/list-image.png";
import ArrowIcon from "../../assets/svg/rounded-arrow-dark.svg";
import WAIcon from "../../assets/images/whatsapp-icon.png";
import { RxCaretDown } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { changeLoginModalStatus, setLoading } from "../../utils/redux/otherSlice";
import { checkAuth, createJwt } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { getAppInformation } from "../../api/apiCall";
const BuyNowSection = lazy(() => import("./components/BuyNowSection"));
const ShareApp = lazy(() => import("./components/ShareApp"));
const Graph = lazy(() => import("./components/Graph"));

const gridItems = [
  {
    icon: Speaking,
    title: "Speaking",
    url: "/speaking",
  },
  {
    icon: Listening,
    title: "Listening",
    url: "/listening",
  },
  {
    icon: Reading,
    title: "Reading",
    url: "/reading",
  },
  {
    icon: Writing,
    title: "Writing",
    url: "/writing",
  },
  {
    icon: Vocalbulary,
    title: "Vocalbulary",
    url: "/vocalbulary",
  },
  {
    icon: Classes,
    title: "Classes",
    url: "/classes",
  },
  {
    icon: BookIelts,
    title: "Book IELTS Exam",
    url: "/book-ielts-exam",
  },
  {
    icon: StudentNews,
    title: "Student News",
    url: "/student-news",
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLoggedIn } = useSelector((state) => state.other);
  let user = JSON.parse(localStorage.getItem("userData"));
  const [userData, setUserData] = useState(user || {});

  const handleClick = () => {
    !userLoggedIn && dispatch(changeLoginModalStatus(true));
  };

  const handleLinkClick = (url) => {
    if (checkAuth()) {
      return navigate(url);
    }
    return dispatch(changeLoginModalStatus(true));
  };

  // get app information
  const getAppInfo = async () => {
    if (userData) {
      try {
        dispatch(setLoading(true))
        const data = {
          uid: userData.uid,
          platform: userData.platform,
          uniqueDeviceId: userData.uniqueDeviceId,
          fcmToken: userData.fcmToken,
          currentLocationLatitude: "",
          currentLocationLongitude: "",
        };

        const encryptedData = createJwt(data);
        const formData = new FormData();
        formData.append("encrptData", encryptedData);
        const response = await getAppInformation(formData);
        console.log({ response });
        if (!response.data.failure) {
          setUserData(response.data.userInformation);
          localStorage.setItem(
            "userData",
            JSON.stringify(response.data.userInformation)
          );
          localStorage.setItem("paymentInformation", JSON.stringify(response.data.data));
        }
      } catch (err) {
        console.log(err);
      }finally{
        dispatch(setLoading(false))
      }
    } else {
      console.log("No user");
    }
  };

  useEffect(() => {
    // Function to fetch data initially and on tab visibility change
    const fetchOnTabVisibilityChange = () => {
      if (!document.hidden) {
        getAppInfo(); // Fetch data when tab becomes visible
      }
    };

    // Initial data fetch
    getAppInfo();

    // Event listener for visibility change
    document.addEventListener("visibilitychange", fetchOnTabVisibilityChange);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener(
        "visibilitychange",
        fetchOnTabVisibilityChange
      );
    };
  }, []);
  return (
    <div className="homepage pb-2 md:pb-28 lg:pb-0 relative w-full flex flex-col bg-[#F7F7F7] md:max-h-screen overflow-y-scroll">
      <div className="sticky z-10 left-0 top-0 hidden lg:flex justify-between items-center py-[0.4rem] w-full px-6 lg:px-[3rem] bg-white">
        <h3 className="text-lg font-medium">Your Progress Summary</h3>
        <div className="flex items-center gap-6">
          <img
            onClick={handleClick}
            src={IGIcon}
            alt=""
            className="w-8 h-8 object-contain cursor-pointer"
          />
          <div
            onClick={handleClick}
            className="p-[.2rem] rounded-full flex gap-2 items-center text-2xl text-gray-400 border cursor-pointer border-gray-300"
          >
            <img
              src={ProfileIcon}
              alt=""
              className="w-8 h-8 object-contain rounded-full"
            />
            <RxCaretDown />
          </div>
        </div>
      </div>
      <div className="lg:hidden py-3 px-6 lg:px-[3rem]">
        <div className="bg-gradient-to-r from-[#8ea7d6] to-[#ffdc19] rounded-xl p-[1px] shadow-md">
          <div className="bg-white p-3 rounded-xl flex gap-3 items-center justify-between">
            <span className="text-md font-medium">
              How many students we helped?
            </span>
            <button
              onClick={handleClick}
              className="bg-[#FFEFE1] text-[#F49043] py-2 px-4 rounded-xl"
            >
              Check
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-[3rem] py-3">
        <div className="lg:my-3">
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-10 xl:grid-cols-12 gap-10 xl:gap-14 grid-rows-1 h-[45vh] md:h-[32vh]">
              <div className="w-full h-full col-span-6 xl:col-span-8 mb-4 md:mb-0 bg-white shadow-lg md:shadow-none rounded-xl p-4">
                <Graph />
              </div>
              <div className="hidden h-full md:flex flex-1 col-span-4 xl:col-span-4">
                <ShareApp />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-6 md:mt-3 mb-2 w-full items-start">
          <h3 className="hidden md:inline-block text-lg -mb-1 font-medium">
            Prepare with ease
          </h3>
          <div className="w-full grid md:grid-cols-[65%_30%] gap-10 justify-between items-start mb-6 md:mb-0">
            <div className="w-full grid grid-cols-3 sm:grid-cols-4 gap-[0.3rem]">
              {gridItems.map(({ icon, title, url }) => (
                <button
                  className={`flex flex-col justify-self-start items-center pr-[1rem]
                  ${title === "Book IELTS Exam" && "order-last md:order-2"}
                  `}
                  onClick={() => handleLinkClick(url)}
                  key={title}
                >
                  <img
                    src={icon}
                    alt=""
                    className="w-full aspect-square object-contain"
                  />
                  <span className="text-md md:text-[0.9rem] font-medium text-center -mt-2">
                    {title}
                  </span>
                </button>
              ))}
            </div>

            <div className="w-full md:flex flex-col gap-5 hidden mt-3">
              <button
                onClick={handleClick}
                className="w-full flex items-center justify-center gap-2 bg-white shadow-md py-3 px-2 rounded-md"
              >
                <img
                  src={YoutubeIcon}
                  className="w-5 h-5 object-contain"
                  alt=""
                />
                <span className="text-[0.9rem] text-gray-600">
                  App Guide Video
                </span>
              </button>
              <div className="bg-white p-4 rounded-md flex flex-col gap-3 shadow-sm text-center">
                <h2 className="text-md font-medium">Practice Mock Tests</h2>
                <p className="text-sm text-gray-600">
                  Get the authentice IELTS exam experience with all four modules
                  covered!
                </p>
                <button
                  onClick={() => handleLinkClick("/practice-mock-test")}
                  className="primary-btn"
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 items-center justify-between w-full md:hidden bg-white border border-gray-400 p-3 rounded-xl mb-7">
          <div className="flex gap-2 items-start">
            <img src={ListImg} className="w-14 object-contain" alt="" />
            <div className="flex flex-col gap-2">
              <h4 className="text-xl font-medium">Practice Mock Test</h4>
              <p className="text-md text-gray-600">
                Get the authentic IELTS exam experience with all four modules
                covered!
              </p>
            </div>
          </div>
          <img
            onClick={handleClick}
            src={ArrowIcon}
            className="h-8 w-8 object-contain"
            alt=""
          />
        </div>

        <div className="w-full md:hidden">
          <BuyNowSection />
        </div>

        <div className="columns-2 gap-2 my-5 md:hidden">
          <button
            onClick={handleClick}
            className="w-full flex items-center justify-center gap-2 bg-white shadow-md px-2 py-3 rounded-md"
          >
            <img src={YoutubeIcon} className="w-5 h-5 object-contain" alt="" />
            <span className="text-md md:text-sm text-gray-600">
              App Guide Video
            </span>
          </button>
          <button
            onClick={handleClick}
            className="w-full flex items-center justify-center gap-2 bg-white shadow-md px-2 py-3 rounded-md"
          >
            <img src={WAIcon} className="w-5 h-5 object-contain" alt="" />
            <span className="text-md md:text-sm text-gray-600">
              Help & Support
            </span>
          </button>
        </div>

        <div className="md:hidden">
          <ShareApp />
        </div>
      </div>
    </div>
  );
};

export default Home;
