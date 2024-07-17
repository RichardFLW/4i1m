// components/GuessField.js

import React from "react";
import "./GuessField.module.css"; // Assurez-vous de charger les styles CSS

const GuessField = ({ inputValues }) => {
  return (
    <div className="inputsContainer">
      {inputValues.map((value, index) => (
        <input
          key={index}
          type="text"
          value={value}
          readOnly
          className="letterInput"
        />
      ))}
    </div>
  );
};

export default GuessField;
