import Logo from "../assets/images/logo.png";
import HomeIcon from "../assets/svg/home-icon.svg";
import CommunityIcon from "../assets/svg/community-icon.svg";
import StoriesIcon from "../assets/svg/stories-icon.svg";
import ShopIcon from "../assets/svg/storefront-icon.svg";
import MsgIcon from "../assets/svg/message-icon.svg";
import LogoutIcon from "../assets/svg/signout-icon.svg";
import BuyNowSection from "../pages/Home/components/BuyNowSection";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { changeLoginModalStatus } from "../utils/redux/otherSlice";
import { checkAuth } from "../utils/helpers";
import { Outlet } from "react-router-dom";

const navOptions = [
  {
    label: "Home",
    icon: HomeIcon,
    url: "/",
  },
  // {
  //   label: "Community",
  //   icon: CommunityIcon,
  //   url: "#",
  // },
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
  const { logout } = UserAuth();
  const { userLoggedIn } = useSelector((state) => state.user);
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
    <div
      className={`${
        pathname === "/" && "pt-[8.2rem] md:pt-[9.6rem] lg:pt-0"
      } h-screen flex flex-col`}
    >
      <div className="flex flex-1 md:max-h-screen">
        <div className="hidden w-[28%] max-w-[28%] bg-gradient-to-b from-primary-500 to-primary-700 lg:flex flex-col items-center justify-between pb-3">
          <div className="flex flex-col items-center w-full">
            <Link to='/' className={`flex gap-1 items-center`}>
              <img
                src={Logo}
                alt="logo"
                className="h-12 w-12 object-contain my-1"
              />
              <span className="text-xl text-white">BabyCode</span>
            </Link>
            <div className="flex w-full items-center flex-col gap-2 my-3 xl:my-6">
              {navOptions.map(({ label, icon, url }) => (
                <div
                  className={`flex w-[80%] gap-2 items-center rounded-md hover:bg-primary-100 cursor-pointer p-2 ${
                    pathname === url && "bg-primary-100"
                  }`}
                  key={label}
                  onClick={() => handleOptionClick(url)}
                >
                  <img src={icon} alt="" className="h-6 w-6 object-contain" />
                  <span
                    className={`text-white text-md ${
                      pathname === url && "font-medium"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center w-full">
            <BuyNowSection />
            {userLoggedIn && (
              <div
                onClick={logout}
                className="flex w-[80%] gap-2 items-center rounded-md hover:bg-primary-100 cursor-pointer p-2"
              >
                <img
                  src={LogoutIcon}
                  alt=""
                  className="h-6 w-6 object-contain"
                />
                <span className="text-white text-md">Logout</span>
              </div>
            )}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
