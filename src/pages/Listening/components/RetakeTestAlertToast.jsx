import React, { useCallback, useEffect, useRef } from "react";
import ToastModalWrapper from "../../../components/Toast/ToastModalWrapper";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import {
  changeListeningModalStatus,
  setListeningVideoDetails,
} from "../../../utils/redux/otherSlice";

const RetakeTestAlert = ({ test }) => {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const dispatch = useDispatch();

  const onConfirm = async () => {
    toast.dismiss();
    setTimeout(() => {
      dispatch(setListeningVideoDetails(test));
      dispatch(changeListeningModalStatus(true));
    }, 900);
  };

  const onDismiss = useCallback(() => {
    toast.dismiss();
  }, []);

  const onClick = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      ref={overlay}
      className="fixed z-50 left-0 right-0 top-0 bottom-0 mx-auto bg-black/20 h-screen w-screen inset-0 -mt-[16px] -ml-[16px]"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-4/5 h-fit"
      >
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.2 }}
          exit={{ opacity: 0, y: 200 }}
          className="w-fit p-5 h-fit bg-white rounded-lg max-w-8/12"
        >
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-medium">
              Are you sure you want to retake this test?
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 items-center mt-3">
            <button onClick={onDismiss} className="secondary-btn">
              No
            </button>
            <button onClick={onConfirm} className="primary-btn">
              Yes
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const showRetakeTestAlert = (test) => {
  toast.custom(<RetakeTestAlert test={test} />, { duration: Infinity });
};

export default showRetakeTestAlert;
