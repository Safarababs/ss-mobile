import React from "react";
import "./ErrorModal.css";

const ErrorModal = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="error-modal">
      <div className="error-modal-content">
        <span className="error-modal-close" onClick={onClose}>
          &times;
        </span>
        <p>{message}</p>
        <button className="error-modal-ok" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
