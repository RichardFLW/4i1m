// components/GuessField.js

import React from "react";
import styles from "./GuessField.module.css";

const GuessField = ({ inputValues }) => {
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

export default GuessField;