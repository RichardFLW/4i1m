"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { Raleway, Merriweather } from "next/font/google";
import "./globals.css";
import { useRouter } from "next/navigation";

// Importer les polices avec les poids spécifiés
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-raleway",
});
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
});

export default function Home() {
  const router = useRouter();
  const shapesContainerRef = useRef(null); // Utilisation de useRef pour le conteneur des formes

  useEffect(() => {
    const shapesContainer = shapesContainerRef.current;
    const shapesCount = 20; // Nombre de formes flottantes
    const shapes = []; // Tableau pour stocker les références aux formes créées

    // Créer des formes flottantes et les ajouter au conteneur
    for (let i = 0; i < shapesCount; i++) {
      const shape = document.createElement("div");
      shape.classList.add(styles.shape);

      // Positionner la forme de manière aléatoire en horizontal
      shape.style.left = `${Math.random() * 100}%`;

      // Ajouter des délais et durées d'animation aléatoires pour chaque forme
      shape.style.animationDelay = `${Math.random() * 5}s`;
      shape.style.animationDuration = `${Math.random() * 10 + 5}s`;

      shapesContainer.appendChild(shape);
      shapes.push(shape); // Ajouter la forme au tableau
    }

    // Fonction de nettoyage pour retirer les formes
    return () => {
      shapes.forEach((shape) => {
        if (shapesContainer && shapesContainer.contains(shape)) {
          shapesContainer.removeChild(shape);
        }
      });
    };
  }, []);

  // Gestionnaire de clic pour le bouton
  const handleClick = () => {
    router.push("/jeu"); // Remplacez '/jeu' par le chemin vers votre jeu
  };

  return (
    <div className={`${raleway.variable} ${merriweather.variable}`}>
      <main className={styles.main}>
        <div className={styles.background}>
          <div className={styles.shapes} ref={shapesContainerRef}></div>{" "}
          {/* Référence au conteneur des formes */}
        </div>
        <section className={styles.section}>
          <Image
            src="/eskcaST8S_y1xbULqqsCqQ.jpeg"
            alt="Image 1"
            width={600}
            height={600}
            className={styles.image}
          />
          <button onClick={handleClick} className={styles.button}>
            <span className={styles.buttonIcon}>🎮</span> Jouer
          </button>
        </section>
      </main>
    </div>
  );
}
