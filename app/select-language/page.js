// app/select-language/page.js
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./SelectLanguage.module.css";
import Image from "next/image";

const SelectLanguagePage = () => {
  const router = useRouter();
  const [progressEn, setProgressEn] = useState(0);
  const [progressFr, setProgressFr] = useState(0);

  useEffect(() => {
    const savedGameStateEn = localStorage.getItem("gameState-en");
    const savedGameStateFr = localStorage.getItem("gameState-fr");

    if (savedGameStateEn) {
      const { currentIndex } = JSON.parse(savedGameStateEn);
      setProgressEn(Math.floor((currentIndex / 17) * 100));
    }

    if (savedGameStateFr) {
      const { currentIndex } = JSON.parse(savedGameStateFr);
      setProgressFr(Math.floor((currentIndex / 17) * 100));
    }
  }, []);

  const handleLanguageSelect = (language) => {
    const savedGameState = localStorage.getItem(`gameState-${language}`);
    const currentIndex = savedGameState ? JSON.parse(savedGameState).currentIndex : 0;
    router.push(`/jeu?lang=${language}&index=${currentIndex}`);
  };

  const handleReset = (language) => {
    localStorage.removeItem(`gameState-${language}`);
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Je devine le mot en :</h1>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Image src="/flags/flag-gb.svg" alt="Anglais" width={30} height={20} />
            <h2 className={styles.cardTitle}>Anglais</h2>
          </div>
          <p className={styles.progressLabel}>Progression : {progressEn}%</p>
          <div className={styles.progressBar}>
            <div className={styles.progress} style={{ width: `${progressEn}%` }}></div>
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={() => handleLanguageSelect("en")} className={styles.button}>
              <Image src="/icons/continue.svg" alt="Continuer" width={16} height={16} />
              Continuer
            </button>
          </div>
          <p className={styles.resetText} onClick={() => handleReset("en")}>
            <Image src="/icons/reset.svg" alt="Réinitialiser" width={16} height={16} />
            Réinitialiser
          </p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Image src="/flags/flag-fr.svg" alt="Français" width={30} height={20} />
            <h2 className={styles.cardTitle}>Français</h2>
          </div>
          <p className={styles.progressLabel}>Progression : {progressFr}%</p>
          <div className={styles.progressBar}>
            <div className={styles.progress} style={{ width: `${progressFr}%` }}></div>
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={() => handleLanguageSelect("fr")} className={styles.button}>
              <Image src="/icons/continue.svg" alt="Continuer" width={16} height={16} />
              Continuer
            </button>
          </div>
          <p className={styles.resetText} onClick={() => handleReset("fr")}>
            <Image src="/icons/reset.svg" alt="Réinitialiser" width={16} height={16} />
            Réinitialiser
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectLanguagePage;
