import React from "react";
import BgImage from "../../assets/images/signin-background.png";
import BgImage1 from "../../assets/images/signin-bg-1.png";
import BgImage2 from "../../assets/images/signin-bg-2.png";
import Logo from "../../assets/images/babycode-logo.png";
import GoogleIcon from "../../assets/images/google.png";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const Signin = () => {
  const { googleSignIn } = UserAuth();
  return (
    <div className="w-full h-screen overflow-hidden flex items-center justify-center relative">
      <div className="w-full absolute left-0 top-0 flex h-screen">
        <img src={BgImage1} className="w-[55%] object-cover hidden md:inline" alt="" />
        <div className="relative w-full md:w-[45%] flex justify-center items-center">
          <img
            src={BgImage2}
            className="w-full object-cover h-screen absolute -z-10"
            alt=""
          />
          <div className="w-fit flex flex-col items-center gap-8 max-w-[70%]">
            <div className="flex gap-1 justify-center items-center">
              <img
                src={Logo}
                alt=""
                className="h-10 w-10 object-contain"
              />
              <span className="text-lg text-black">BabyCode</span>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold">Let's Get Started</h2>
              <p className="text-md">Perform , Analyze and Crack IELTS </p>
            </div>
            <button
              onClick={googleSignIn}
              className="flex gap-3 font-medium items-center px-10 py-3 text-primary-500 bg-white border border-primary-500 rounded-full transition-all duration-300 hover:bg-primary-500 hover:text-white"
            >
              <img src={GoogleIcon} className="w-5 h-5 object-contain" alt="" />
              <span>Sign in with Google</span>
            </button>
            <p className="text-sm text-center">
              By continuing you agree to the{" "}
              <Link to="/" className="text-primary-500">
                privacy policy
              </Link>{" "}
              and{" "}
              <Link to="/" className="text-primary-500">
                terms
              </Link>{" "}
              of BabyCode.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
