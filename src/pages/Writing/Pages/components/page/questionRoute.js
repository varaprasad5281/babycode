import { Link, useNavigate, useParams } from "react-router-dom";
import profilePic from "../../../../../assets/images/profile-icon.png";
import { useEffect, useRef, useState } from "react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { FaRegLightbulb } from "react-icons/fa";
import { RiEdit2Line } from "react-icons/ri";
import ImageFullScreenPopup from "../ImageFullScreenPopup";
import { toast } from "react-hot-toast";
import { createJwt } from "../../../../../utils/helpers";
import { submitWritingTestAnswer } from "../../../../../api/apiCall";
import { UserAuth } from "../../../../../context/AuthContext";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../../../utils/redux/otherSlice";
import BuyMembershipAlert from "../BuyMembershipAlert";
import NoData from "../../../../../components/NoData";

const Question = () => {
  const { category, subcategory } = useParams();
  const navigate = useNavigate();
  const questionData = JSON.parse(sessionStorage.getItem("writingQuestion"));
  const [wordsCount, setWordsCount] = useState(0);
  const [showAnswerInput, setShowAnswerInput] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const answersRef = useRef(null);
  const textareaRef = useRef(null);
  const [answer, setAnswer] = useState("");
  const [minWordCount, setMinWordCount] = useState(
    subcategory !== undefined ? 240 : 140
  );
  const [showBuyMembershipAlert, setShowBuyMembershipAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { errorLogout } = UserAuth();
  const dispatch = useDispatch();
  const prevAnswers =
    JSON.parse(sessionStorage.getItem("prevWritingAnswers")) || [];
  const currentQuestionPrevAnswerData = prevAnswers.find(
    (question) => question?.QuestionUniqueId === questionData?.QuestionUniqueId
  );
  const prevAnswerPageUrl =
    subcategory !== undefined
      ? `/writing/${category}/${subcategory}/${questionData?.QuestionUniqueId}/prev-answer`
      : `/writing/${category}/${questionData?.QuestionUniqueId}/prev-answer`;

  let backPageUrl;

  if (subcategory !== undefined) {
    backPageUrl = `/writing/${category}/${subcategory}`;
  } else {
    backPageUrl = `/writing/${category}`;
  }
  const handleAnswerChange = (e) => {
    const value = e.target.value;
    setAnswer(value);
    const count = value
      .split(/\b\W+\b/)
      .filter((word) => word.trim() !== "").length;
    setWordsCount(count);
    autoResizeTextArea(e.target);

    // if (value.trim() === "") {
    //   return setAnswerErr("Answer cannot be empty");
    // } else {
    //   if (count < minWordCount) {
    //     return setAnswerErr(
    //       `Answer should not be less than ${minWordCount} words`
    //     );
    //   }
    //   setAnswerErr("");
    // }
  };

  // increase the row height of the text area
  const autoResizeTextArea = (textArea) => {
    textArea.style.height = "auto";
    textArea.style.height = textArea.scrollHeight + "px";
  };

  // handle click on write your answer button
  const handleWriteAnswerClick = () => {
    setShowAnswerInput(true);
    setShowAnswers(false);
  };

  // handle scroll to show the answers on button click
  useEffect(() => {
    if (showAnswers && answersRef.current) {
      answersRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showAnswers]);

  // handle scroll to show the input box on button click
  useEffect(() => {
    if (showAnswerInput && textareaRef.current) {
      textareaRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [showAnswerInput]);

  const submitAnswer = async (e) => {
    e.preventDefault();
    if (answer.trim() !== "") {
      if (wordsCount < minWordCount) {
        toast(`Answer should not be less than ${minWordCount} words`, {
          id: "validationToast",
        });
        return;
      }
      try {
        dispatch(setLoading(true));
        const user = JSON.parse(localStorage.getItem("userData"));
        const data = {
          uid: user.uid,
          platform: "web",
          uniqueDeviceId: localStorage.getItem("uniqueDeviceId") || "",
          QuestionUniqueId: questionData.QuestionUniqueId,
          Answer: answer,
        };
        const encryptedData = createJwt(data);
        const formData = new FormData();
        formData.append("encrptData", encryptedData);
        const res = await submitWritingTestAnswer(formData);
        if (!res.data.failure) {
          setAnswer("");
          const data = res.data.data;
          const newAnswer = {
            Answer: answer,
            QuestionUniqueId: questionData.QuestionUniqueId,
            Result: data.TestResult,
            uid: user.uid,
          };
          prevAnswers.unshift(newAnswer);
          sessionStorage.setItem(
            "prevWritingAnswers",
            JSON.stringify(prevAnswers)
          );
          navigate(prevAnswerPageUrl);
          toast.success("Answer submitted successfully");
        } else {
          if (res.data.logout) {
            errorLogout(res.data.errorMessage);
          } else if (res.data.tokenInvalid) {
            toast.error(res.data.errorMessage);
          } else {
            // toast.error(res.data.errorMessage);
            setAlertMessage(res.data.errorMessage);
            setShowBuyMembershipAlert(true);
          }
        }
      } catch (err) {
        toast(err.message);
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      // setAnswerErr("Answer cannot be empty");
      toast("Answer cannot empty", {
        id: "validationToast",
      });
    }
  };

  if (!questionData) {
    return <NoData prevUrl={"/writing"} urlLabel={"Writing"} />;
  }
  return (
    <div className="w-full lg:max-h-screen overflow-scroll pb-5 bg-background ">
      <header className="hidden p-2 px-[3rem] w-[100%] bg-white lg:flex justify-end sticky top-0 ">
        <img src={profilePic} alt="." className="h-[30px] w-[30px]" />
      </header>
      <div className="bg-white">
        <div
          className="flex gap-2 items-center text-xl px-6 py-3 lg:hidden cursor-pointer w-fit"
          onClick={() => navigate(backPageUrl)}
        >
          <button>
            <PiCaretLeftBold />
          </button>{" "}
          Question
        </div>
      </div>
      <main className="px-2 sm:px-4 md:px-8">
        <div className="hidden lg:flex flex-wrap gap-3 text-[11px] md:text-[14px] justify-between items-center">
          <div className="flex lg:pt-[2rem] items-center gap-2">
            <Link to="/">Home</Link> <PiCaretRightBold />{" "}
            <Link to="/writing">Writing</Link> <PiCaretRightBold />{" "}
            <Link to={`/writing/${category}`}>{category}</Link>{" "}
            {subcategory && (
              <>
                {" "}
                <PiCaretRightBold />{" "}
                <Link to={`/writing/${category}/${subcategory}`}>
                  {subcategory}
                </Link>
              </>
            )}{" "}
            <PiCaretRightBold /> <p className="text-primary-500">Question</p>
          </div>
        </div>
        <div className="pt-3 lg:pt-8">
          <div className="bg-white p-3 md:p-4 flex flex-col gap-3">
            <p className="w-fit p-1 text-[12px] bg-gradient-to-r from-[#3dc8ca] to-[#04a4e9] text-white rounded-md mb-2 ">
              Question
            </p>
            <p className="">{questionData?.Question}</p>
            {questionData?.image && (
              <img
                src={questionData?.image}
                alt={questionData?.image}
                className="h-fit max-h-[60vh] sm:h-[40vh] sm:max-h-[40vh] object-contain cursor-pointer"
                onClick={() => setShowImagePopup(true)}
              />
            )}
            {!showAnswerInput && (
              <div className="grid grid-cols-2 sm:flex gap-3 sm:gap-6">
                <button
                  onClick={() => {
                    setShowAnswers(!showAnswers);
                    setShowAnswerInput(false);
                  }}
                  className="flex gap-1 md:gap-2 justify-center items-center text-[11px] md:text-[12px] bg-[#FCF300] border-[#FCF300] p-2 border rounded-full"
                >
                  <FaRegLightbulb /> {showAnswers ? "Hide" : "View"} Best
                  Answers
                </button>
                <button
                  onClick={handleWriteAnswerClick}
                  className="flex gap-1 md:gap-2 justify-center items-center text-[11px] md:text-[12px]  border rounded-full border-[#1D46C9] text-[#1D46C9] p-2"
                >
                  <RiEdit2Line /> Write Your Answer
                </button>
                {currentQuestionPrevAnswerData && (
                  <Link
                    to={prevAnswerPageUrl}
                    className="col-span-2 flex gap-1 md:gap-2 justify-center items-center text-[11px] md:text-[12px]  border rounded-full border-pink-300 text-pink-600 p-2"
                  >
                    Previous Answer
                  </Link>
                )}
              </div>
            )}
            {showAnswerInput && questionData && (
              <form
                onSubmit={submitAnswer}
                className="flex flex-col w-full gap-2 pb-3"
                ref={textareaRef}
              >
                <textarea
                  rows="5"
                  placeholder="Start typing..."
                  className="bg-[#F1F5F9] rounded-lg max-w-[100%] p-3 outline-none overflow-y-auto"
                  onChange={handleAnswerChange}
                  value={answer}
                />
                <div className="flex items-center gap-2">
                  {wordsCount > 0 && (
                    <p className="text-defaultGray p-2 w-fit">
                      Word Count: {wordsCount}
                    </p>
                  )}
                  {/* {answerErr && (
                    <p className="text-red-600 w-fit text-sm">{answerErr}</p>
                  )} */}
                </div>
                <button type="submit" className="primary-btn w-fit">
                  Submit & Check Band Score
                </button>
              </form>
            )}

            {showAnswers && (
              <div className="flex flex-col gap-2 mt-2" ref={answersRef}>
                {questionData?.FirstAnswer && (
                  <div className="flex flex-col gap-1 border-b py-3">
                    <h5 className="bg-primary-50 text-primary-500 p-2 w-fit rounded-sm">
                      Answer 1
                    </h5>
                    <p>{questionData?.FirstAnswer}</p>
                  </div>
                )}
                {questionData?.SecondAnswer && (
                  <div className="flex flex-col gap-1 border-b py-3">
                    <h5 className="bg-primary-50 text-primary-500 p-2 w-fit rounded-sm">
                      Answer 2
                    </h5>
                    <p>{questionData?.SecondAnswer}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      {showImagePopup && (
        <ImageFullScreenPopup
          image={questionData.image}
          closePopup={() => setShowImagePopup(false)}
        />
      )}
      {showBuyMembershipAlert && (
        <BuyMembershipAlert
          message={alertMessage}
          cancelPopup={() => setShowBuyMembershipAlert(false)}
        />
      )}
    </div>
  );
};

export default Question;
