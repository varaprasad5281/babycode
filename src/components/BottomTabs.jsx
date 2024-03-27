import { AiFillHome } from "react-icons/ai";
import { MdPeople } from "react-icons/md";
import { MdAutoStories } from "react-icons/md";
import { GiShop } from "react-icons/gi";
import { FaMessage } from "react-icons/fa6";
import { useState } from "react";

const tabs = [
  {
    label: "Home",
    icon: <AiFillHome size={35} />,
  },
  {
    label: "Community",
    icon: <MdPeople size={38} />,
  },
  {
    label: "Stories",
    icon: <MdAutoStories size={35} />,
  },
  {
    label: "Shop",
    icon: <GiShop size={35} />,
  },
  {
    label: "Feedback",
    icon: <FaMessage size={32} />,
  },
];
const BottomTabs = () => {
  const [option, setOption] = useState(0);
  return (
    <div className="grid lg:hidden grid-cols-5 h-24 pt-2 pb-3 px-3 gap-4 fixed bottom-0 left-0 w-full bg-white">
      {tabs.map(({ label, icon }, index) => (
        <div
          className={`flex flex-col p-2 justify-between items-center ${
            option === index
              ? "border-t-2 border-t-blue-500 text-blue-500"
              : " text-gray-800"
          }`}
          key={label}
          onClick={() => setOption(index)}
        >
          {icon}
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default BottomTabs;
