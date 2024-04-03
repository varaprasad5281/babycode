import { PiCaretRight } from "react-icons/pi";
import reading from "../../../assets/images/reading-image.png";

const ImproveTestCard = ({ item }) => {
  const { title, desc } = item;
  return (
    <div className="test-card">
      <div className="flex gap-2">
        <img
          className="md:aspect-[2/1] aspect-[1.5/1] h-[70px]"
          src={reading}
          alt="."
        />
        <div>
          <div className=" px-1 md:px-2 w-fit text-[#4bb3d6] rounded-full lg:text-[14px] text-[12px] font-[600]">
            Book
          </div>
          <h2 className="font-[500] text-[13px] lg:text-[16px]  ">{title}</h2>
          <p className="text-defaultGray text-[11px] lg:text-[16px]"> {desc}</p>
        </div>
      </div>

      <div>
        <button>
          <PiCaretRight />
        </button>
      </div>
    </div>
  );
};

export default ImproveTestCard;