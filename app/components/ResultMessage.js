import React from "react";
import styles from "./ResultMessage.module.css"; // Assurez-vous d'importer les styles

const ResultMessage = ({ message, isSuccess }) => {
  return (
    <div className={isSuccess ? styles.successMessage : styles.errorMessage}>
      {message}
    </div>
  );
};

export default ResultMessage;
