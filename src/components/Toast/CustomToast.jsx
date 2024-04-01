import React from "react";
import ToastModalWrapper from "./ToastModalWrapper";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const CustomToast = ({ message, onConfirm, onProceedWithEmail }) => {
  return (
    <ToastModalWrapper>
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 200 }}
        className="w-fit p-5 h-fit bg-white rounded-lg"
      >
        <div className="flex flex-col items-center">
          <h4 className="text-lg font-medium">Read carefully</h4>
          <p className="text-center">{message}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 items-center mt-3">
          <button onClick={onConfirm} className="primary-btn">
            Ok
          </button>
          <button onClick={onProceedWithEmail} className="secondary-btn">
            Proceed with this new email
          </button>
        </div>
      </motion.div>
    </ToastModalWrapper>
  );
};

const showAlert = (message) => {
  toast.custom(
    <CustomToast
      message={message}
      onConfirm={() => toast.dismiss()}
      onProceedWithEmail={() => toast.dismiss()}
    />,
    { duration: Infinity }
  );
};

export default showAlert;
