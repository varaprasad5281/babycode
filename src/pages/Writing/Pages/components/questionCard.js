import { PiCaretRightBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const QuestionCard = ({ item, category }) => {
  const { question } = item;

  return (
    <Link
      to={`/writing/${category}/Question`}
      className="odd:bg-white p-3 gap-3 px-2 md:px-5 flex justify-between items-center hover:scale-[101.5%] transition-all"
    >
      <div>
        <p className="w-fit p-1 text-[12px] bg-gradient-to-r from-[#3dc8ca] to-[#04a4e9] text-white rounded-md mb-2 ">
          Question
        </p>
        <p>{question}</p>
      </div>
      <div>
        <PiCaretRightBold />
      </div>
    </Link>
  );
};

export default QuestionCard;
