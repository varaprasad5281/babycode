import React, { useCallback, useRef } from "react";
import { motion } from "framer-motion";

const BuyMembershipAlert = ({ message, cancelPopup }) => {
  const overlay = useRef(null);

  const onClick = useCallback(
    (e) => {
      if (e.target === overlay.current) {
        if (cancelPopup) cancelPopup();
      }
    },
    [cancelPopup, overlay]
  );
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed h-screen w-screen left-0 top-0 p-10 bg-black/40 z-50 flex justify-center items-center"
      ref={overlay}
      onClick={onClick}
    >
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.2 }}
        className="bg-white h-fit p-4 md:p-6 rounded-lg flex justify-center flex-col gap-6 items-center"
      >
        <p className="text-lg max-w-md">{message}</p>
        <div className="flex gap-5 justify-between w-full">
          <button className="secondary-btn w-fit" onClick={cancelPopup}>
            Cancel
          </button>
          <button className="primary-btn w-fit" onClick={cancelPopup}>
            Buy Membership
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BuyMembershipAlert;
