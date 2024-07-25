//app/components/GuessInputs.js

import React from "react";
import styles from "./GuessInputs.module.css"; 

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
