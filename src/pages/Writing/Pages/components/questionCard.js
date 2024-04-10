import { PiCaretRightBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const QuestionCard = ({ item, category, subcategory }) => {
  const setQuestion = () => {
    sessionStorage.setItem("writingQuestion", JSON.stringify(item));
  };
  const subCategory = subcategory !== undefined ? subcategory : "";
  return (
    <Link
      to={`/writing/${category}${subCategory && "/" + subCategory}/Question`}
      onClick={setQuestion}
      className="odd:bg-white p-3 gap-3 px-2 md:px-5 flex justify-between items-center"
    >
      <div>
        <p className="w-fit p-1 text-[12px] bg-gradient-to-r from-[#3dc8ca] to-[#04a4e9] text-white rounded-md mb-2 ">
          Question
        </p>
        <p className="line-clamp-2 sm:w-[95%]">{item.Question}</p>
      </div>
      <div>
        <PiCaretRightBold />
      </div>
    </Link>
  );
};

export default QuestionCard;
