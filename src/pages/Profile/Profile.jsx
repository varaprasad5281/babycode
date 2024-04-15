import React, { useState } from "react";
import profilePic from "../../assets/images/profile-icon.png";
import UnderDevelopment from "../../components/UnderDevelopment";
import { PiCaretLeftBold, PiCaretRightBold, PiCrossThin } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import ModalCard from "./components/ModalCard";
import { RxCross2 } from "react-icons/rx";

const Profile = () => {
  const navigate = useNavigate;
  return (
    <div className="w-full lg:max-h-screen overflow-scroll pb-5 gr bg-background relative ">
      <header className="hidden p-2 px-4 w-[100%] bg-white lg:flex justify-end z-10 sticky top-0 ">
        <img src={profilePic} alt="." className="h-[30px] w-[30px]" />
      </header>
      <div className="bg-white sticky top-0 z-10">
        <div className="flex gap-2 items-center p-3 lg:hidden">
          <button onClick={() => navigate(-1)}>
            <PiCaretLeftBold />
          </button>{" "}
          Profile
        </div>
      </div>
      <main className="p-4 px-4 md:px-6 lg:px-8 relative">
        <div className="flex items-center gap-2">
          <Link to="/profile">Profile</Link> <PiCaretRightBold />{" "}
          <p className="text-primary-500">Profile</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 py-5 md:gap-2">
          <ModalCard
            details={{
              categroy: "Full name",
              value: "Preeti ",
              action: "edit",
            }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p>Edit name</p>
                <RxCross2 />
              </div>
              <input className="p-1.5 py-2 focus:outline-none text-lg border border-2 border-[#C6C6C6] rounded-lg" />
              <button className="bg-blue-600 p-2 rounded-full font-semibold text-white">
                Save
              </button>
            </div>
          </ModalCard>
          <ModalCard
            details={{
              categroy: "Mobile Number",
              value: "+91 9998887776",
              action: "edit",
            }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p>Edit Mobile Number</p>
                <RxCross2 />
              </div>
              <input className="p-1.5 py-2 focus:outline-none text-lg border border-2 border-[#C6C6C6] rounded-lg" />
              <button className="bg-blue-600 p-2 rounded-full font-semibold text-white">
                Save
              </button>
            </div>
          </ModalCard>
          <ModalCard
            details={{
              categroy: "Email",
              value: "Preeti@gmail.com ",
              action: "edit",
            }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p>Edit Email</p>
                <RxCross2 />
              </div>
              <input className="p-1.5 py-2 focus:outline-none text-lg border border-2 border-[#C6C6C6] rounded-lg" />
              <button className="bg-blue-600 p-2 rounded-full font-semibold text-white">
                Save
              </button>
            </div>
          </ModalCard>
          <ModalCard
            details={{
              categroy: "Membership",
              value: "Active-Till-2023-Jun-16",
            }}
          >
            <div className="flex flex-col gap-4 ">
              {/* <div className="flex justify-between items-center">
                <p>Edit Email</p>
                <RxCross2 />
              </div> */}
              <div className="flex flex-col gap-1">
                <label className="text-sm ">Select your Plan</label>
                <div className="grid grid-cols-3 gap-2 py-2">
                  <div className="text-center p-3 rounded-lg shadow-[0_0_8px_#00000036]">
                    <p className="text-[#C6C6C6]">10 days</p>
                    <p>₹ 299</p>
                  </div>
                  <div className="text-center p-3 rounded-lg shadow-[0_0_8px_#00000036]">
                    <p className="text-[#C6C6C6]">1 month</p>
                    <p>₹ 399</p>
                  </div>
                  <div className="text-center p-3 rounded-lg shadow-[0_0_8px_#00000036] border-[3px] border-blue-600 relative">
                    <p className="absolute text-[8px] text-nowrap top-0 left-1/2 translate-x-[-50%] translate-y-[-50%]  p-1 rounded-br-xl rounded-tl-xl bg-blue-600 text-white">
                      Most Popular
                    </p>
                    <p className="text-[#C6C6C6]">1 year</p>
                    <p>₹ 499</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 mb-5">
                <label className="text-sm ">
                  Apply Promo Code (if have any){" "}
                </label>
                <input className="p-1.5 py-2 focus:outline-none text-lg border border-2 border-[#C6C6C6] rounded-lg" />
              </div>
              <div className="flex flex-col gap-3">
                <button className="bg-blue-600 p-2 rounded-full font-semibold text-white">
                  Pay with QR code
                </button>
                <button className="bg-blue-600 p-2 rounded-full font-semibold text-white">
                  Pay with card & UPI
                </button>
              </div>
            </div>
          </ModalCard>
          <ModalCard
            details={{
              categroy: "Wallet",
              value: "Wallet amount is Rs.0",
            }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex justify-center font-bold text-xl text-blue-600 items-center">
                <p>Wallet</p>
              </div>
              <div className="text-center">
                <h2 className="font-semibold text-2xl">No Record Found</h2>
                <p>No one used your coupon code while buying subscription</p>
              </div>
              <button className="bg-blue-600 p-2 rounded-full font-semibold text-white">
                Invite friends
              </button>
            </div>
          </ModalCard>
        </div>
      </main>
      <button className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#CF1E04] p-1 border-[2px]  px-9 border-[#CF1E04] rounded-lg">
        Logout
      </button>
    </div>
  );
};

export default Profile;
