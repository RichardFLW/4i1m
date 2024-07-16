// app/page.js

"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { Raleway, Merriweather } from "next/font/google";
import "./globals.css";

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
  return (
    <div className={`${raleway.variable} ${merriweather.variable}`}>
      <main className={styles.main}>
        <section className={styles.leftSection}>
          <div className={styles.textContainer}>
            <h1 className={styles.title}>
              Bienvenue sur <span className={styles.highlight}>4 Images</span>{" "}
              pour <span className={styles.highlight}>1 Mot</span>
            </h1>
            <p className={styles.description}>
              Essayez de deviner le mot à partir de 4 images dans ce jeu amusant
              et stimulant. Cliquez sur le bouton ci-dessous pour commencer à
              jouer !
            </p>
            <Link href="/jeu" passHref>
              <button className={styles.button}>Jouer</button>
            </Link>
          </div>
        </section>
        <section className={styles.rightSection}>
          <div className={styles.imageContainer}>
            <Image
              src="/pexels-nord6-796504.jpg"
              alt="Image 1"
              fill
              style={{ objectFit: "cover" }}
              className={styles.image}
            />
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/pexels-nord6-792416.jpg"
              alt="Image 2"
              fill
              style={{ objectFit: "cover" }}
              className={styles.image}
            />
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/pexels-gael-dupont-langevin-374582892-16121200.jpg"
              alt="Image 3"
              fill
              style={{ objectFit: "cover" }}
              className={styles.image}
            />
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/pexels-pixabay-54108.jpg"
              alt="Image 4"
              fill
              style={{ objectFit: "cover" }}
              className={styles.image}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
