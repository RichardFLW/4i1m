// app/components/SelectLanguagePage.jsx
"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./SelectLanguage.module.css";
import words from "../components/words";

const SelectLanguagePage = () => {
  const router = useRouter();
  const [progress, setProgress] = useState({ en: 0, fr: 0 });

  useEffect(() => {
    const calculateProgress = (language) => {
      const savedState = JSON.parse(localStorage.getItem(`gameState-${language}`));
      if (savedState && savedState.currentIndex) {
        return Math.round((savedState.currentIndex / words[language].length) * 100);
      }
      return 0;
    };

    setProgress({
      en: calculateProgress("en"),
      fr: calculateProgress("fr"),
    });
  }, []);

  const handleLanguageSelect = (language) => {
    router.push(`/jeu?lang=${language}`);
  };

  const handleReset = (language) => {
    localStorage.removeItem(`gameState-${language}`);
    setProgress((prev) => ({ ...prev, [language]: 0 }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Je devine le mot en :</h1>
      <div className={styles.buttons}>
        <div className={styles.languageContainer}>
          <button onClick={() => handleLanguageSelect("en")} className={styles.button}>
            Anglais
          </button>
          <p className={styles.progress}>Progression : {progress.en}%</p>
          <button onClick={() => handleReset("en")} className={styles.resetButton}>
            Réinitialiser
          </button>
        </div>
        <div className={styles.languageContainer}>
          <button onClick={() => handleLanguageSelect("fr")} className={styles.button}>
            Français
          </button>
          <p className={styles.progress}>Progression : {progress.fr}%</p>
          <button onClick={() => handleReset("fr")} className={styles.resetButton}>
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectLanguagePage;
