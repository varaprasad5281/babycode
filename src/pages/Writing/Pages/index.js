import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import profilePic from "../../../assets/images/profile-icon.png";
import { useEffect, useRef, useState } from "react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import QuestionBank from "./components/questionBank";
import data from "./components/questionsData";
import QuestionCard from "./components/questionCard";
import { UserAuth } from "../../../context/AuthContext";
import { createJwt } from "../../../utils/helpers";
import { fetchWritingQuestionAnswer } from "../../../api/apiCall";
import { toast } from "react-hot-toast";

const WritingQBank = () => {
  const [activeCategory, setCategory] = useState(0);
  const [activeType, setType] = useState(0);
  const { category } = useParams();
  const navigate = useNavigate();
  const effectRan = useRef(true);
  const { errorLogout } = UserAuth();
  const [questions, setQuestions] = useState([]);

  // get writing task data
  const getData = async () => {
    const user = JSON.parse(localStorage.getItem("userData"));
    try {
      const data = {
        uid: user.uid,
        platform: "web",
        uniqueDeviceId: localStorage.getItem("uniqueDeviceId") || "",
        CategoryName: category,
        SubCategoryName: "",
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
      <header className="hidden p-2 px-4 w-[100%] bg-white lg:flex justify-end sticky top-0 ">
        <img src={profilePic} alt="." className="h-[30px] w-[30px]" />
      </header>
      <div className="bg-white">
        <div className="flex gap-2 items-center p-2 lg:hidden">
          <button onClick={() => navigate(-1)}>
            <PiCaretLeftBold />
          </button>{" "}
          Writing
        </div>
      </div>
      <main className="p-4 px-5 md:px-8">
        <div className="flex items-center gap-2">
          <Link to="/">Home</Link> <PiCaretRightBold />{" "}
          <Link to="/writing">Writing</Link> <PiCaretRightBold />{" "}
          <p className="text-primary-500">{category}</p>
        </div>
        <div className="pt-8 text-[12px] md:text-[14px] flex flex-col gap-1">
          {questions.length > 0 &&
            questions.map((item, i) => (
              <QuestionCard category={category} item={item} key={i} />
            ))}
        </div>
      </main>
    </div>
  );
};

export default WritingQBank;
