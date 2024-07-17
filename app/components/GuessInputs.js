import React from "react";
import styles from "./GuessInputs.module.css"; // Importer le fichier CSS pour les styles

const GuessInputs = ({ inputValues }) => {
  return (
    <div className={styles.inputsContainer}>
      {inputValues.map((value, index) => (
        <input
          key={index}
          type="text"
          value={value}
          readOnly
          className={styles.letterInput}
        />
      ))}
    </div>
  );
};

export default GuessInputs;
