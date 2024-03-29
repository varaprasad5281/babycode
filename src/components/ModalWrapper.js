import React from "react";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import Signin from "./Signin";

const ModalWrapper = ({ children }) => {
  const { showLoginModal } = useSelector((state) => state.store);

  return (
    <div className="relative">
      {/* Show children components with reduced opacity */}
      <div style={{ opacity: showLoginModal ? 0.5 : 1 }}>{children}</div>

      {/* Show LoginModal on top if not authenticated */}
      {showLoginModal && (
        <Modal>
          <Signin />
        </Modal>
      )}
    </div>
  );
};

export default ModalWrapper;
