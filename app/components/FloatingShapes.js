// Importation des hooks React nécessaires et des styles CSS pour le composant
import { useEffect, useRef } from "react";
import styles from "./FloatingShapes.module.css";

// Déclaration du composant fonctionnel `FloatingShapes`
const FloatingShapes = () => {
  // Utilisation du hook `useRef` pour créer une référence mutable pour le conteneur des formes
  const shapesContainerRef = useRef(null);

  // Utilisation du hook `useEffect` pour créer et gérer les formes flottantes lorsqu'elles sont montées
  useEffect(() => {
    // Référence à l'élément conteneur des formes
    const shapesContainer = shapesContainerRef.current;
    const shapesCount = 20; // Nombre de formes à créer
    const shapes = []; // Tableau pour stocker les éléments de formes

    // Boucle pour créer le nombre spécifié de formes
    for (let i = 0; i < shapesCount; i++) {
      // Création d'un nouvel élément `div` pour chaque forme
      const shape = document.createElement("div");
      // Ajout de la classe CSS `shape` à l'élément
      shape.classList.add(styles.shape);

      // Positionnement aléatoire de la forme sur l'axe horizontal
      shape.style.left = `${Math.random() * 100}%`;
      // Définition d'un délai d'animation aléatoire pour chaque forme
      shape.style.animationDelay = `${Math.random() * 5}s`;
      // Définition d'une durée d'animation aléatoire pour chaque forme
      shape.style.animationDuration = `${Math.random() * 10 + 5}s`;

      // Ajout de la forme au conteneur des formes
      shapesContainer.appendChild(shape);
      // Ajout de la forme au tableau des formes
      shapes.push(shape);
    }

    // Fonction de nettoyage pour retirer les formes lorsque le composant est démonté
    return () => {
      shapes.forEach((shape) => {
        // Vérification que le conteneur et la forme existent encore
        if (shapesContainer && shapesContainer.contains(shape)) {
          // Retrait de la forme du conteneur
          shapesContainer.removeChild(shape);
        }
      });
    };
  }, []); // Le tableau vide signifie que cet effet s'exécute uniquement une fois après le premier rendu

  // Rendu du conteneur des formes, la référence `shapesContainerRef` est attachée à cet élément `div`
  return <div className={styles.shapes} ref={shapesContainerRef}></div>;
};

// Exportation du composant `FloatingShapes` pour pouvoir l'utiliser dans d'autres fichiers
export default FloatingShapes;
