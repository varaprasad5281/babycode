import Logo from "../assets/images/logo.png";
import HomeIcon from "../assets/svg/home-icon.svg";
import CommunityIcon from "../assets/svg/community-icon.svg";
import StoriesIcon from "../assets/svg/stories-icon.svg";
import ShopIcon from "../assets/svg/storefront-icon.svg";
import MsgIcon from "../assets/svg/message-icon.svg";
import LogoutIcon from "../assets/svg/signout-icon.svg";
import BuyNowSection from "./BuyNowSection";
import { useLocation } from "react-router-dom";

const navOptions = [
  {
    label: "Home",
    icon: HomeIcon,
    url: "/",
  },
  {
    label: "Community",
    icon: CommunityIcon,
    url: "/community",
  },
  {
    label: "Stories",
    icon: StoriesIcon,
    url: "/stories",
  },
  {
    label: "Shop",
    icon: ShopIcon,
    url: "/shop",
  },
  {
    label: "Feedback",
    icon: MsgIcon,
    url: "/feedback",
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <div className="hidden w-[25%] bg-gradient-to-b from-primary-500 to-primary-700 lg:flex flex-col items-center justify-between pb-3">
      <div className="flex flex-col items-center w-full">
        <div className="flex gap-1 items-center">
          <img src={Logo} alt="" className="h-12 w-12 object-contain my-1" />
          <span className="text-xl text-white">BabyCode</span>
        </div>
        <div className="flex w-full items-center flex-col gap-2 my-6">
          {navOptions.map(({ label, icon, url }) => (
            <div
              className={`flex w-[80%] gap-2 items-center rounded-md hover:bg-primary-100 cursor-pointer p-2 ${
                pathname === url && "bg-primary-100"
              }`}
              key={label}
            >
              <img src={icon} alt="" className="h-6 w-6 object-contain" />
              <span className={`text-white text-md ${pathname === url && "font-medium"}`}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <BuyNowSection />
        <div className="flex w-[80%] gap-2 items-center rounded-md hover:bg-primary-100 cursor-pointer p-2">
          <img src={LogoutIcon} alt="" className="h-6 w-6 object-contain" />
          <span className="text-white text-md">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
