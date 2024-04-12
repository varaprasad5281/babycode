import React, { useState } from "react";
import ReelIcon from "../../../assets/svg/FilmReel.svg";
import NewsIcon from "../../../assets/svg/Newspaper.svg";
import BooksIcon from "../../../assets/svg/Book.svg";
import { PiCaretRightBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import {
  changeListeningModalStatus,
  setListeningVideoDetails,
} from "../../../utils/redux/otherSlice";
import { TiArrowBack } from "react-icons/ti";

const ImproveListening = ({ materials }) => {
  const [materialData, setMaterialData] = useState([]);
  const dispatch = useDispatch();

  const handleMaterialDataClick = (data) => {
    dispatch(
      setListeningVideoDetails({ ...data, isImproveListeningData: true })
    );
    dispatch(changeListeningModalStatus(true));
  };

  return materialData.length ? (
    <div className="w-full sm:px-6 lg:px-[3rem]">
      <div className="flex flex-col gap-3">
        <div
          className="ml-6 sm:ml-0 flex items-center gap-2 w-fit cursor-pointer"
          onClick={() => setMaterialData([])}
        >
          <TiArrowBack className="text-xl -mt-1" />
          <h5 className="">Back</h5>
        </div>
        <div className="flex flex-col gap-1">
          {materialData.map((data) => (
            <div
              className="w-full shadow-sm cursor-pointer bg-white px-5 py-3"
              onClick={() => handleMaterialDataClick(data)}
            >
              <div className="flex gap-2 items-center justify-between">
                <span className="font-medium text-md">{data.Name}</span>
                <PiCaretRightBold size={15} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <>
      {materials?.length > 0 && (
        <div className="flex flex-col w-full sm:gap-1 sm:px-6 lg:px-[3rem]">
          <h3 className="text-lg font-medium sm:hidden mb-2 mx-6">
            Improve Listening with these Audios{" "}
          </h3>
          <News data={materials[0]} />
          <Books data={materials[1]} setMaterialData={setMaterialData} />
          <Reel data={materials[2]} setMaterialData={setMaterialData} />
        </div>
      )}
    </>
  );
};

export default ImproveListening;

const News = ({ data }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      setListeningVideoDetails({ ...data.data, isImproveListeningData: true })
    );
    dispatch(changeListeningModalStatus(true));
  };
  return (
    <div className="w-full flex flex-col gap-3" onClick={handleClick}>
      <div className="border-l-2 border-[#0E946E] bg-white cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3 shadow-sm">
        <div className="flex flex-col gap-2">
          <div className="h-fit w-fit rounded-md sm:bg-[#0e946e14] p-1 flex gap-1 items-center">
            <img
              src={NewsIcon}
              className="w-6 aspect-square object-contain"
              alt=""
            />
            <span className="text-[#0E946E] text-sm font-medium">News</span>
          </div>
          <p className="text-md font-medium">{data.Title}</p>
        </div>
        <div className="flex justify-between gap-3 items-start">
          <span className="text-[#AAAAAA] text-sm">{data.Description}</span>
          <button className="">
            <PiCaretRightBold size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Books = ({ data, setMaterialData }) => {
  return (
    <div
      className="w-full flex flex-col gap-3"
      onClick={() => setMaterialData(data.data)}
    >
      <div className="border-l-2 border-[#01B5D6] bg-white cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3 shadow-sm">
        <div className="flex flex-col gap-2">
          <div className="h-fit w-fit rounded-md sm:bg-[#ECFCFF] p-1 flex gap-1 items-center">
            <img
              src={BooksIcon}
              className="w-6 aspect-square object-contain"
              alt=""
            />
            <span className="text-[#01B5D6] text-sm font-medium">Books</span>
          </div>
          <p className="text-md font-medium">{data.Title}</p>
        </div>
        <div className="flex justify-between gap-3 items-start">
          <span className="text-[#AAAAAA] text-sm">{data.Description}</span>
          <button className="">
            <PiCaretRightBold size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Reel = ({ data, setMaterialData }) => {
  return (
    <div
      className="w-full flex flex-col gap-3"
      onClick={() => setMaterialData(data.data)}
    >
      <div className="border-l-2 border-[#FF3B5D] bg-white cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3 shadow-sm">
        <div className="flex flex-col gap-2">
          <div className="h-fit w-fit rounded-md sm:bg-[#FFEFF2] p-1 flex gap-1 items-center">
            <img
              src={ReelIcon}
              className="w-6 aspect-square object-contain"
              alt=""
            />
            <span className="text-[#FF3B5D] text-sm font-medium">News</span>
          </div>
          <p className="text-md font-medium">{data.Title}</p>
        </div>
        <div className="flex justify-between gap-3 items-start">
          <span className="text-[#AAAAAA] text-sm">{data.Description}</span>
          <button className="">
            <PiCaretRightBold size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
