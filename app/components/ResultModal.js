// app/components/ResultModal.jsx
import React from "react";
import styles from "./ResultModal.module.css";

const ResultModal = ({ isOpen, message, isSuccess, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modal} ${isSuccess ? styles.success : styles.error}`}>
        <h2 className={styles.modalTitle}>{isSuccess ? "Félicitations !" : "Dommage..."}</h2>
        <p className={styles.modalMessage}>{message}</p>
        <button className={styles.closeButton} onClick={onClose}>
          {isSuccess ? "Continuer" : "Réessayer"}
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
