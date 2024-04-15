import React, { useState } from "react";
import UnderDevelopment from "../../components/UnderDevelopment";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import profilePic from "../../assets/images/profile-icon.png";
import { Link, useNavigate } from "react-router-dom";
import story from "../../assets/images/story1.jpeg";
import StoryCard from "./components/storyCard";
import PartnerCard from "./components/partnerCard";
const studentStories = [
  {
    thumbnail: story,
    videoURL: "https://www.youtube.com/shorts/Xklkt1Csk3A",
    studentName: "Preeti gupta",
    bandScore: "8.0",
  },
  {
    thumbnail: story,
    videoURL: "https://www.youtube.com/shorts/Xklkt1Csk3A",
    studentName: "Preeti gupta",
    bandScore: "8.0",
  },
  {
    thumbnail: story,
    videoURL: "https://www.youtube.com/shorts/Xklkt1Csk3A",
    studentName: "Preeti gupta",
    bandScore: "8.0",
  },
  {
    thumbnail: story,
    videoURL: "https://www.youtube.com/shorts/Xklkt1Csk3A",
    studentName: "Preeti gupta",
    bandScore: "8.0",
  },
  {
    thumbnail: story,
    videoURL: "https://www.youtube.com/shorts/Xklkt1Csk3A",
    studentName: "Preeti gupta",
    bandScore: "8.0",
  },
];

const PartnerData = [
  { pic: "", name: "Ramandeep Sharma", role: "Brand Ambassador" },
  { pic: "", name: "Ramandeep Sharma", role: "Brand Ambassador" },
  { pic: "", name: "Ramandeep Sharma", role: "Brand Ambassador" },
];

const Stories = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(0);
  return (
    <div className="w-full lg:max-h-screen overflow-scroll pb-5 bg-background ">
      <header className="hidden p-2 px-4 w-[100%] bg-white lg:flex justify-end z-10 sticky top-0 ">
        <Link to="/profile">
          {" "}
          <img src={profilePic} alt="." className="h-[30px] w-[30px]" />
        </Link>
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
        <div className="pt-5">
          <div className="md:flex gap-4 sm:w-full grid grid-cols-2">
            <button
              onClick={() => setActiveCategory(0)}
              className={`py-2 pb-1 text-defaultGray border-b border-transparent ${
                activeCategory === 0 &&
                "border-b  !border-primary-500 text-primary-500"
              }`}
            >
              Student Stories
            </button>
            <button
              onClick={() => setActiveCategory(1)}
              className={`py-2 pb-1 text-defaultGray border-b border-transparent ${
                activeCategory === 1 &&
                "border-b  !border-primary-500 text-primary-500"
              }`}
            >
              Our Partners
            </button>
          </div>
          {activeCategory === 0 ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(135px,1fr))]   p-1 py-5 gap-3     md:gap-5 lg:gap-10">
              {studentStories.map((e, i) => (
                <StoryCard key={i} item={e} />
              ))}
            </div>
          ) : (
            <div className="py-6">
              <h1>Our Partners-People who believe in our potential</h1>
              <div className="grid  md:grid-cols-[repeat(auto-fit,minmax(185px,1fr))]   p-2 py-5 gap-2 md:gap-6 lg:gap-10">
                {PartnerData.map((e, i) => (
                  <PartnerCard item={e} key={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Stories;
