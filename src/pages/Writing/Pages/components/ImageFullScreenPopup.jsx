import React from "react";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";

const ImageFullScreenPopup = ({ image, closePopup }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="w-full h-full fixed top-0 left-0 z-50 bg-black/20 flex justify-center items-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        className="bg-white h-fit lg:h-[90vh] w-[90vw] p-3 md:p-8 rounded-lg flex justify-center flex-col items-center"
      >
        <button onClick={closePopup} className="text-3xl self-end"><MdClose /></button>
        <img src={image} alt={image} className="h-full object-contain" />
      </motion.div>
    </motion.div>
  );
};

export default ImageFullScreenPopup;
