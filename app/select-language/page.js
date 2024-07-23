"use client";

import { useRouter } from "next/navigation";
import styles from "./SelectLanguage.module.css";

const SelectLanguagePage = () => {
  const router = useRouter();

  const handleLanguageSelect = (language) => {
    router.push(`/jeu?lang=${language}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Je devine le mot en :</h1>
      <div className={styles.buttons}>
        <button onClick={() => handleLanguageSelect("en")} className={styles.button}>Anglais</button>
        <button onClick={() => handleLanguageSelect("fr")} className={styles.button}>Français</button>
      </div>
    </div>
  );
};

export default SelectLanguagePage;
