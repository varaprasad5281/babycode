import { PiCaretRightBold } from "react-icons/pi";

const OtherContentListItem = ({
  content,
  showOffcanvas,
  setShowOffcanvas,
  selectedContent,
  setSelectedContent,
  idx,
}) => {
  const handleOffcanvasShow = () => {
    setSelectedContent(content);
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
      <button className="">
        <PiCaretRightBold />
      </button>
    </div>
  );
};

export default OtherContentListItem;
