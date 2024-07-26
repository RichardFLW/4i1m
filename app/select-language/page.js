// app/components/SelectLanguagePage.jsx
"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./SelectLanguage.module.css";
import ConfirmationModal from "../components/ConfirmationModal";
import words from "../components/words";

const SelectLanguagePage = () => {
  const router = useRouter();
  const [progress, setProgress] = useState({ en: 0, fr: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [flagSrc, setFlagSrc] = useState('');

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
    const savedState = JSON.parse(localStorage.getItem(`gameState-${language}`));
    const currentIndex = savedState ? savedState.currentIndex : 0;
    const queryParams = new URLSearchParams({ lang: language, index: currentIndex }).toString();
    router.push(`/jeu?${queryParams}`);
  };

  const openModal = (language) => {
    setCurrentLanguage(language);
    setFlagSrc(language === 'en' ? '/flags/flag-gb.svg' : '/flags/flag-fr.svg');
    setModalOpen(true);
  };

  const handleReset = () => {
    localStorage.removeItem(`gameState-${currentLanguage}`);
    setProgress((prev) => ({ ...prev, [currentLanguage]: 0 }));
    setModalOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Je devine le mot en :</h1>
      <div className={styles.buttons}>
        <div className={styles.languageContainer}>
          <button onClick={() => handleLanguageSelect("en")} className={styles.button}>
            <img src="/flags/flag-gb.svg" alt="English" className={styles.flag} /> Anglais
          </button>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={{ width: `${progress.en}%` }}></div>
          </div>
          <button onClick={() => openModal("en")} className={styles.resetButton}>
            Réinitialiser
          </button>
        </div>
        <div className={styles.languageContainer}>
          <button onClick={() => handleLanguageSelect("fr")} className={styles.button}>
            <img src="/flags/flag-fr.svg" alt="French" className={styles.flag} /> Français
          </button>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={{ width: `${progress.fr}%` }}></div>
          </div>
          <button onClick={() => openModal("fr")} className={styles.resetButton}>
            Réinitialiser
          </button>
        </div>
      </div>
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={handleReset}
        language={currentLanguage}
        flagSrc={flagSrc}
      />
    </div>
  );
};

export default SelectLanguagePage;
