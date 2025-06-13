import React, { useEffect } from "react";
import "./Modal.css";
// import CloseArrow from "../assets/arrow.svg";
// import XIcon from "../assets/X.svg";

const Modal = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
          window.addEventListener("keydown", handleEscape);
          document.body.style.overflow = "hidden";  // it blocks the scroll
        } else {
          document.body.style.overflow = "auto";    // normal scroll
        }

        return () => {
            window.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "auto";  // scroll restored
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
      <div
        className="modal-overlay"
        onClick={(e) => {
          if (e.target.classList.contains("modal-overlay")) {
            onClose();
          }
        }}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="arrow-container">
            <img
              src={`${process.env.PUBLIC_URL}/assets/arrow.svg`}
              alt="Close Modal Arrow"
              className="close-icon"
              onClick={onClose}
            />
          </div>
          <div className="x-container">
            <img
              src={`${process.env.PUBLIC_URL}/assets/X.svg`}
              alt="Close Modal X"
              className="close-icon-x"
              onClick={onClose}
            />
          </div>
          {children}
        </div>
      </div>
    );
}

export default Modal;
