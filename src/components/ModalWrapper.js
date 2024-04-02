import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import Signin from "./Signin";
import ListeningModal from "../pages/Listening/components/ListeningModal";

const ModalWrapper = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { showLoginModal, showListeningModal } = useSelector(
    (state) => state.other
  );

  useEffect(() => {
    setIsOpen(showLoginModal || showListeningModal);
  }, [showLoginModal, showListeningModal]);

  return (
    <div className="relative">
      {/* Show children components with reduced opacity */}
      <div style={{ opacity: isOpen ? 0.5 : 1 }}>{children}</div>

      {/* Show LoginModal on top if not authenticated */}
      {showLoginModal && (
        <Modal>
          <Signin />
        </Modal>
      )}

      {/* Show ListeningModal to display listening content */}
      {showListeningModal && (
        <Modal>
          <ListeningModal />
        </Modal>
      )}
    </div>
  );
};

export default ModalWrapper;
