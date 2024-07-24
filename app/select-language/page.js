"use client"; 

import { useRouter } from "next/navigation";

import styles from "./SelectLanguage.module.css";

// Déclaration du composant fonctionnel `SelectLanguagePage`
const SelectLanguagePage = () => {
  
  const router = useRouter();

  // Fonction pour gérer la sélection de la langue
  const handleLanguageSelect = (language) => {
    // Utilisation de `router.push` pour naviguer vers la page `/jeu` avec la langue sélectionnée en tant que paramètre de requête
    router.push(`/jeu?lang=${language}`);
  };

  // Rendu du composant
  return (
    <div className={styles.container}>
     
      <h1 className={styles.title}>Je devine le mot en :</h1>
    
      <div className={styles.buttons}>
       
        <button
          onClick={() => handleLanguageSelect("en")}
          className={styles.button}
        >
          Anglais
        </button>
       
        <button
          onClick={() => handleLanguageSelect("fr")}
          className={styles.button}
        >
          Français
        </button>
      </div>
    </div>
  );
};


export default SelectLanguagePage;
