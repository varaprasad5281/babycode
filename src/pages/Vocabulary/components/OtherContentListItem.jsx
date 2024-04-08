import { PiCaretRightBold } from "react-icons/pi";
import { setVocabularyOffcanvasContent } from "../../../utils/redux/otherSlice";
import { useDispatch } from "react-redux";
import { GoBookmarkFill } from "react-icons/go";

const OtherContentListItem = ({ content, setShowOffcanvas, idx }) => {
  const dispatch = useDispatch();
  let savedList = JSON.parse(localStorage.getItem("savedVocabularies")) || [];

  const handleOffcanvasShow = () => {
    const data = {
      ...content,
      savedStatus: savedList.includes(content.resourceUniqueId),
    };
    dispatch(setVocabularyOffcanvasContent(data));
    setShowOffcanvas(true);
  };
  return (
    <div
      onClick={handleOffcanvasShow}
      className={`${
        idx % 2 === 0 ? "bg-white" : "bg-transparent"
      } bg-white cursor-pointer flex flex-row sm:items-center justify-between px-5 py-3 shadow-sm`}
    >
      <div className="flex flex-col gap-1">
        <p className="text-md font-medium">{content.resourceName}</p>
        <span className="text-[#AAAAAA] text-sm">
          {content.resourceDefination}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {savedList.includes(content.resourceUniqueId) && (
          <GoBookmarkFill className="text-primary-500" />
        )}
        <button className="">
          <PiCaretRightBold />
        </button>
      </div>
    </div>
  );
};

export default OtherContentListItem;
