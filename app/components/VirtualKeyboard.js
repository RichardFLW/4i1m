// Importation des modules React et des styles CSS pour le composant
import React, { useEffect, useState } from "react";
import styles from "./VirtualKeyboard.module.css";


// `correctWord` est le mot correct à deviner
// `onKeyPress` est une fonction qui sera appelée lorsque l'utilisateur appuie sur une touche
const VirtualKeyboard = ({ correctWord, onKeyPress }) => {
  // Déclaration de l'état local `keys` pour stocker les touches du clavier virtuel
  const [keys, setKeys] = useState([]);

  // Utilisation du hook `useEffect` pour générer les touches du clavier chaque fois que `correctWord` change
  useEffect(() => {
    // Fonction pour générer les touches du clavier virtuel
    const generateKeys = () => {
      // Conversion du mot correct en lettres majuscules et en tableau de caractères
      const letters = correctWord.toUpperCase().split("");
      // Création d'un tableau contenant toutes les lettres de l'alphabet
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      // Création d'un ensemble (Set) contenant les lettres du mot correct
      const availableKeys = new Set([...letters]);

      // Ajout de lettres aléatoires jusqu'à ce que l'ensemble contienne 14 lettres
      while (availableKeys.size < 14) {
        // Sélection d'une lettre aléatoire de l'alphabet
        const randomLetter =
          alphabet[Math.floor(Math.random() * alphabet.length)];
        // Ajout de la lettre aléatoire à l'ensemble
        availableKeys.add(randomLetter);
      }

      // Conversion de l'ensemble en tableau, puis mélange des lettres de manière aléatoire
      setKeys(Array.from(availableKeys).sort(() => Math.random() - 0.5));
    };

    // Appel de la fonction pour générer les touches du clavier
    generateKeys();
  }, [correctWord]); // Dépendance: ce code s'exécute chaque fois que `correctWord` change

  return (
    
    <div className={styles.keyboard}>
      {/* Première rangée de touches */}
      <div className={styles.keyboardRow}>
        {/* Création des boutons pour les 7 premières touches */}
        {keys.slice(0, 7).map((key, index) => (
          // Chaque bouton a une clé unique, une classe CSS et appelle `onKeyPress` avec la lettre correspondante lorsqu'il est cliqué
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
      {/* Deuxième rangée de touches */}
      <div className={styles.keyboardRow}>
        {/* Création des boutons pour les 7 dernières touches */}
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
