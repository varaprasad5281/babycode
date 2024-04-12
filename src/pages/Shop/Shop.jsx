import React, { useState } from "react";
import profilePic from "../../assets/images/profile-icon.png";

import UnderDevelopment from "../../components/UnderDevelopment";
import { Link, useNavigate } from "react-router-dom";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import "./index.css";
import Buycard from "./components/Buycard";
import Boughtcard from "./components/boughtCard";
const Shop = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [showSidebar, setSideBar] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="w-full lg:max-h-screen overflow-scroll pb-5 bg-background ">
      <header className="hidden p-2 px-4 w-[100%] bg-white lg:flex justify-end z-10 sticky top-0 ">
        <img src={profilePic} alt="." className="h-[30px] w-[30px]" />
      </header>
      <div className="bg-white sticky top-0 z-10">
        <div className="flex gap-2 items-center p-3 lg:hidden">
          <button onClick={() => navigate(-1)}>
            <PiCaretLeftBold />
          </button>{" "}
          Shops
        </div>
      </div>
      <main className="p-4 px-4 md:px-6 lg:px-8 ">
        <div className="flex items-center gap-2">
          <Link to="/shop">Shop</Link> <PiCaretRightBold />{" "}
          <p className="text-primary-500">
            {activeCategory === 0 ? "Your Books" : "Buy Books"}
          </p>
        </div>
        <div className="pt-5">
          <div className="md:flex gap-4 sm:w-full grid grid-cols-2">
            <button
              onClick={() => setActiveCategory(0)}
              className={`py-2 pb-1 text-defaultGray border-b border-transparent ${
                activeCategory === 0 &&
                "border-b  !border-primary-500 text-primary-500"
              }`}
            >
              Your Books
            </button>
            <button
              onClick={() => setActiveCategory(1)}
              className={`py-2 pb-1 text-defaultGray border-b border-transparent ${
                activeCategory === 1 &&
                "border-b  !border-primary-500 text-primary-500"
              }`}
            >
              Buy Books
            </button>
          </div>

          {activeCategory === 0 ? <Boughtcard /> : <Buycard />}
        </div>
      </main>
    </div>
  );
};

export default Shop;
