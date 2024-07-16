// components/VirtualKeyboard.js

import React, { useEffect, useState } from 'react';
import './VirtualKeyboard.module.css'; // Assurez-vous de charger les styles CSS

const VirtualKeyboard = ({ correctWord, onKeyPress }) => {
  const [keys, setKeys] = useState([]);

  // useEffect pour générer les touches en fonction du mot correct
  useEffect(() => {
    const generateKeys = () => {
      const letters = correctWord.split('');
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      const availableKeys = new Set([...letters]);

      while (availableKeys.size < 14) {
        const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
        availableKeys.add(randomLetter);
      }

      setKeys(Array.from(availableKeys).sort(() => Math.random() - 0.5));
    };

    generateKeys();
  }, [correctWord]);

  return (
    <div className="keyboard">
      {keys.map((key, index) => (
        <button
          key={index}
          className="key"
          onClick={() => onKeyPress(key)}
        >
          {key}
        </button>
      ))}
      <button
        className="key"
        onClick={() => onKeyPress('BACKSPACE')}
      >
        ⌫
      </button>
      <button
        className="key"
        onClick={() => onKeyPress('SPACE')}
      >
        Espace
      </button>
    </div>
  );
};

export default VirtualKeyboard;
