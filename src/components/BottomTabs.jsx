import HomeIcon from "../assets/images/home-dark.png";
import HomeIconActive from "../assets/images/home-active.png";
import CommunityIcon from "../assets/images/community-dark.png";
import CommunityIconActive from "../assets/images/community-active.png";
import StoriesIcon from "../assets/images/stories-dark.png";
import StoriesIconActive from "../assets/images/stories-active.png";
import ShopIcon from "../assets/images/shop-dark.png";
import ShopIconActive from "../assets/images/shop-active.png";
import MsgIcon from "../assets/images/feedback-dark.png";
import MsgIconActive from "../assets/images/feedback-active.png";
import { useState } from "react";

const tabs = [
  {
    label: "Home",
    icon: HomeIcon,
    activeIcon: HomeIconActive,
    url: "/",
  },
  {
    label: "Community",
    icon: CommunityIcon,
    activeIcon: CommunityIconActive,
    url: "/community",
  },
  {
    label: "Stories",
    icon: StoriesIcon,
    activeIcon: StoriesIconActive,
    url: "/stories",
  },
  {
    label: "Shop",
    icon: ShopIcon,
    activeIcon: ShopIconActive,
    url: "/shop",
  },
  {
    label: "Feedback",
    icon: MsgIcon,
    activeIcon: MsgIconActive,
    url: "/feedback",
  },
];

const BottomTabs = () => {
  const [option, setOption] = useState(0);
  return (
    <div className="grid lg:hidden grid-cols-5 h-24 pt-2 pb-3 px-3 gap-4 fixed bottom-0 left-0 w-full bg-white">
      {tabs.map(({ label, icon, activeIcon }, index) => (
        <div
          className={`flex flex-col p-2 justify-between cursor-pointer items-center ${
            option === index
              ? "border-t-2 border-t-blue-500 text-blue-500"
              : " text-gray-800"
          }`}
          key={label}
          onClick={() => setOption(index)}
        >
          <img
            src={option === index ? activeIcon : icon}
            alt=""
            className="h-6 w-6 object-contain text-blue-500"
          />
          <span className="text-md">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default BottomTabs;
