import React, { useState, useRef, useEffect } from "react";
import profilePic from "../../../assets/images/profile-icon.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { PiCaretRightBold, PiCaretLeftBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { FiDownload } from "react-icons/fi";
import PDFViewer from "./PDFViewer";
// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { pdfjs } from "react-pdf";
import ReadingTestSubmitAnswerPopupForm from "./ReadingTestSubmitAnswerPopupForm";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const ReadingMaterial = () => {
  const dispatch = useDispatch();
  const effectRan = useRef(true);
  const { state } = useLocation();
  const { item } = state ?? {};
  const navigate = useNavigate();
  const { category } = useParams();
  const [showAnswerSubmitPopup, setShowAnswerSubmitPopup] = useState(false);

  console.log(item?.testFile);

  useEffect(() => {
    if (!item) {
      navigate(`/reading/${category}`);
    }
  });

  // const url = item?.testFile;

  // const docs = [{ uri: url, fileType: "pdf" }];
  // console.log(docs);

  const [clientWidth, setClientWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setClientWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const calculatedWidth = Math.min(clientWidth / 1.3, 800);

  const downloadPdf = async () => {
    // window.open(item?.testFile, "_blank");
    // try {
    //   const res = await axios.get(item?.testFile, {
    //     responseType: "arraybuffer",
    //   });
    //   console.log(res);
    // } catch (err) {
    //   console.log(err);
    // }
  };
  return (
    <div className="w-full lg:max-h-screen overflow-scroll pb-5 bg-background ">
      <header className="hidden p-2 px-4 w-[100%] bg-white lg:flex justify-end z-10 sticky top-0 ">
        <img src={profilePic} alt="." className="h-[30px] w-[30px]" />
      </header>
      <div className="bg-white sticky top-0 z-10">
        <div
          onClick={() => navigate(`/reading/${category}`)}
          className="flex gap-2 items-center p-3 lg:hidden"
        >
          <button>
            <PiCaretLeftBold />
          </button>{" "}
          Reading Practice
        </div>
      </div>{" "}
      <main className="lg:py-4 lg:px-6 h-full">
        <div className="flex justify-between">
          <div className="hidden lg:flex items-center gap-2">
            <Link to="/">Home</Link> <PiCaretRightBold />{" "}
            <Link to={`/reading/${category}`}>
              {category === "reading_tests" ? "Reading Test" : "Improve Test"}
            </Link>{" "}
            <PiCaretRightBold />{" "}
            <p className="text-primary-500">Reading Material</p>
          </div>
          {/* {category !== "improve_tests" && ( */}
          <div className="flex items-center gap-2 py-4 px-6 lg:px-0 lg:py-0">
            <button
              onClick={downloadPdf}
              className="flex gap-2 p-2 px-4 text-[12px] text-[#134287] items-center justify-center rounded-full border-2 border-[#134287]"
            >
              <FiDownload /> Download File
            </button>
            {category === "reading_tests" && (
              <button
                onClick={() => setShowAnswerSubmitPopup(true)}
                className="flex gap-2 p-2 px-4 text-[12px] text-white bg-[#134287] items-center justify-center rounded-full border-2 border-[#134287]"
              >
                Check Band
              </button>
            )}
          </div>
          {/* )} */}
        </div>
        <div className="w-full flex justify-center my-4 h-fit overflow-hidden">
          {/* <p>{item?.testFile}</p> */}
          {/* {category === "reading_tests" ? (
            <PDFViewer src={item?.testFile} />
          ) : ( */}
          <iframe
            type="application/pdf"
            allowFullScreen={true}
            src={`${item?.testFile}#toolbar=0&navpanes=0`}
            frameBorder="0"
            title="PDF Viewer"
            width={calculatedWidth + "%"}
            // className="-my-16 h-[calc(100%_+_54px)]"
            className="h-[86vh] w-[100%]"
            download=""
          ></iframe>
          {/* )} */}
        </div>
      </main>
      {showAnswerSubmitPopup && (
        <ReadingTestSubmitAnswerPopupForm
          closePopup={() => setShowAnswerSubmitPopup(false)}
        />
      )}
    </div>
  );
};

export default ReadingMaterial;
