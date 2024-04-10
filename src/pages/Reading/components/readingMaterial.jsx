import React, { useState, useRef, useEffect } from "react";
import profilePic from "../../../assets/images/profile-icon.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { PiCaretRightBold, PiCaretLeftBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { FiDownload } from "react-icons/fi";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const ReadingMaterial = () => {
  const dispatch = useDispatch();
  const effectRan = useRef(true);
  const { state } = useLocation();
  const { item } = state ?? {};
  const navigate = useNavigate();
  const { category } = useParams();
  console.log("item,", item);
  useEffect(() => {
    if (!item) {
      navigate(`/reading/${category}`);
    }
  });

  const docs = [{ uri: item?.testFile, fileType: "" }];
  console.log(item.testFile);
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
      </div>{" "}
      <main className="p-4 px-6 h-full">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Link to="/">Home</Link> <PiCaretRightBold />{" "}
            <Link to={`/reading/${category}`}>{category}</Link>{" "}
            <PiCaretRightBold />{" "}
            <p className="text-primary-500">Reading Material</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex gap-2 p-2 px-4 text-[12px] text-[#134287] items-center justify-center rounded-full border-2 border-[#134287]">
              <FiDownload /> Download File
            </button>
            {category === "reading_tests" && (
              <button className="flex gap-2 p-2 px-4 text-[12px] text-white bg-[#134287] items-center justify-center rounded-full border-2 border-[#134287]">
                Check Band
              </button>
            )}
          </div>
        </div>
        <div className="w-full h-full overflow-hidden m-5">
          {/* <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} /> */}
          <embed
            type="application/pdf"
            allowFullScreen={true}
            src={item?.testFile}
            title="PDF Viewer"
            width="100%"
            className="-my-16 h-[calc(100%_+_54px)] "
          ></embed>
        </div>
      </main>
    </div>
  );
};

export default ReadingMaterial;
