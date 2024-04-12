import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import profilePic from "../../../assets/images/profile-icon.png";
import { useEffect, useRef, useState } from "react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import data from "./components/questionsData";
import QuestionCard from "./components/questionCard";
import { UserAuth } from "../../../context/AuthContext";
import { createJwt } from "../../../utils/helpers";
import { fetchWritingQuestionAnswer } from "../../../api/apiCall";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../utils/redux/otherSlice";
import NoData from "../../../components/NoData";

const TaskTwoWritingQBank = () => {
  const { category, subcategory } = useParams();
  const navigate = useNavigate();
  const effectRan = useRef(true);
  const { errorLogout } = UserAuth();
  const [questions, setQuestions] = useState([]);
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
        CategoryName: category,
        SubCategoryName: subcategory || "",
      };
      const encryptedData = createJwt(data);
      const formData = new FormData();
      formData.append("encrptData", encryptedData);
      const res = await fetchWritingQuestionAnswer(formData);
      if (!res.data.failure) {
        const data = res.data.data;
        setQuestions(data.WritingQuestionAnswerData);
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

  const prevAnswers =
    JSON.parse(sessionStorage.getItem("prevWritingAnswers")) || [];

  if (!prevAnswers.length) {
    return <NoData prevUrl={"/writing"} urlLabel={"Writing"} />;
  }

  return (
    <div className="w-full lg:max-h-screen overflow-scroll pb-5 bg-background ">
      <header className="hidden p-2 px-[3rem] w-[100%] bg-white lg:flex justify-end sticky top-0 ">
        <img src={profilePic} alt="." className="h-[30px] w-[30px]" />
      </header>
      <div className="bg-white">
        <div
          className="flex text-xl gap-2 items-center px-6 py-3 lg:hidden cursor-pointer w-fit"
          onClick={() => navigate(`/writing/${category}/tasktwo-subcategories`)}
        >
          <button>
            <PiCaretLeftBold />
          </button>{" "}
          {subcategory}
        </div>
      </div>
      <main className="lg:pt-[2.1rem] px-5 md:px-8">
        <div className="hidden lg:flex items-center gap-2">
          <Link to="/">Home</Link> <PiCaretRightBold />{" "}
          <Link to="/writing">Writing</Link> <PiCaretRightBold />{" "}
          <Link to={`/writing/${category}/tasktwo-subcategories`}>
            {category}
          </Link>{" "}
          <PiCaretRightBold />{" "}
          <Link
            className="text-primary-500"
            to={`/writing/${category}/${subcategory}`}
          >
            {subcategory}
          </Link>{" "}
        </div>
        <div className="pt-3 lg:pt-8 text-[12px] md:text-[14px] flex flex-col gap-1">
          {questions.length > 0 &&
            questions.map((item, i) => (
              <QuestionCard
                category={category}
                subcategory={subcategory}
                item={item}
                key={i}
              />
            ))}
        </div>
      </main>
    </div>
  );
};

export default TaskTwoWritingQBank;
