import React, { useEffect, useState } from "react";
import styles from "./VirtualKeyboard.module.css";

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
    <div className={styles.keyboard}>
      <div className={styles.keyboardRow}>
        {keys.slice(0, 7).map((key, index) => (
          <button
            key={index}
            className={styles.key}
            onClick={() => onKeyPress(key)}
          >
            {key}
          </button>
        ))}
        <button
          className={`${styles.key} ${styles.actionKey}`}
          onClick={() => onKeyPress("BACKSPACE")}
        >
          ⌫
        </button>
      </div>
      <div className={styles.keyboardRow}>
        {keys.slice(7).map((key, index) => (
          <button
            key={index}
            className={styles.key}
            onClick={() => onKeyPress(key)}
          >
            {key}
          </button>
        ))}
        <button
          className={`${styles.key} ${styles.actionKey}`}
          onClick={() => onKeyPress("SUBMIT")}
        >
          ✓
        </button>
      </div>
    </div>
  );
};

export default VirtualKeyboard;
