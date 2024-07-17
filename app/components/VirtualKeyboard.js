// components/VirtualKeyboard.js

import React, { useEffect, useState } from "react";
import "./VirtualKeyboard.module.css"; // Assurez-vous de charger les styles CSS

const VirtualKeyboard = ({ correctWord, onKeyPress }) => {
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const generateKeys = () => {
      const letters = correctWord.toUpperCase().split("");
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      const availableKeys = new Set([...letters]);

      while (availableKeys.size < 14) {
        const randomLetter =
          alphabet[Math.floor(Math.random() * alphabet.length)];
        availableKeys.add(randomLetter);
      }

      setKeys(Array.from(availableKeys).sort(() => Math.random() - 0.5));
    };

    generateKeys();
  }, [correctWord]);

  return (
    <div className="keyboard">
      <div className="keyboard-row">
        {keys.slice(0, 7).map((key, index) => (
          <button key={index} className="key" onClick={() => onKeyPress(key)}>
            {key}
          </button>
        ))}
        <button
          className="key action-key"
          onClick={() => onKeyPress("BACKSPACE")}
        >
          ⌫
        </button>
      </div>
      <div className="keyboard-row">
        {keys.slice(7).map((key, index) => (
          <button key={index} className="key" onClick={() => onKeyPress(key)}>
            {key}
          </button>
        ))}
        <button className="key action-key" onClick={() => onKeyPress("SUBMIT")}>
          Valider
        </button>
      </div>
    </div>
  );
};

export default VirtualKeyboard;
