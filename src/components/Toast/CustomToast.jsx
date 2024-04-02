import React from "react";
import ToastModalWrapper from "./ToastModalWrapper";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { UserAuth } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import {
  changeLoginModalStatus,
  setUserLoggedIn,
} from "../../utils/redux/storeSlice";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";

const CustomToast = ({ message, uniqueDeviceId, userData }) => {
  const { googleSignIn } = UserAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onConfirm = async () => {
    toast.dismiss();
    await signOut(auth);
    localStorage.removeItem("userData");
    navigate("/");
    dispatch(changeLoginModalStatus(true));
    googleSignIn();
  };

  const onProceedWithNewEmail = () => {
    localStorage.setItem("userData", JSON.stringify(userData));
    if (!localStorage.getItem("unique_deviceId")) {
      localStorage.setItem("unique_deviceId", uniqueDeviceId);
    }
    dispatch(changeLoginModalStatus(false));
    dispatch(setUserLoggedIn(true));
    toast.dismiss();
    setTimeout(() => toast.success("Signin Successful"), 800);
  };
  return (
    <ToastModalWrapper>
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 200 }}
        className="w-fit p-5 h-fit bg-white rounded-lg max-w-8/12"
      >
        <div className="flex flex-col items-center">
          <h4 className="text-lg font-medium">Read carefully</h4>
          <p className="text-center">{message}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 items-center mt-3">
          <button onClick={onProceedWithNewEmail} className="secondary-btn">
            Proceed with this new email
          </button>
          <button onClick={onConfirm} className="primary-btn">
            Ok
          </button>
        </div>
      </motion.div>
    </ToastModalWrapper>
  );
};

const showAlert = (message, uniqueDeviceId, userData) => {
  toast.custom(
    <CustomToast
      message={message}
      uniqueDeviceId={uniqueDeviceId}
      userData={userData}
    />,
    { duration: Infinity }
  );
};

export default showAlert;
