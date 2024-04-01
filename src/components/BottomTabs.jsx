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
import { useDispatch } from "react-redux";
import { changeLoginModalStatus } from "../utils/redux/storeSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { checkAuth } from "../utils/helpers";

const tabs = [
  {
    label: "Home",
    icon: HomeIcon,
    activeIcon: HomeIconActive,
    url: "/",
  },
  // {
  //   label: "Community",
  //   icon: CommunityIcon,
  //   activeIcon: CommunityIconActive,
  //   url: "#",
  // },
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
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOptionClick = (url) => {
    if (checkAuth()) {
      navigate(url);
    } else {
      if (url !== pathname) {
        dispatch(changeLoginModalStatus(true));
      }
    }
  };
  return (
    <div className="grid lg:hidden grid-cols-4 pb-3 px-3 gap-4 fixed bottom-0 left-0 w-full bg-white">
      {tabs.map(({ label, icon, activeIcon, url }, index) => (
        <div
          className={`flex flex-col p-2 gap-2 justify-between cursor-pointer items-center ${
            pathname === url
              ? "border-t-2 border-t-blue-700 text-blue-700"
              : " text-[#4D4D4D]"
          }`}
          key={label}
          onClick={() => handleOptionClick(url)}
        >
          <img
            src={pathname === url ? activeIcon : icon}
            alt=""
            className="h-6 w-6 object-contain"
          />
          <span className="text-md">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default BottomTabs;
