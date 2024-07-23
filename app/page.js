//app/page.js
"use client"

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Raleway, Merriweather } from "next/font/google";
import styles from "./page.module.css";
import "./globals.css";
import { useRouter } from "next/navigation";

const FloatingShapes = dynamic(() => import('../app/components/FloatingShapes'), { ssr: false });

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-raleway",
});
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-merriweather",
});

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/jeu");
  };

  return (
    <div className={`${raleway.variable} ${merriweather.variable}`}>
      <main className={styles.main}>
        <div className={styles.background}>
          <FloatingShapes />
        </div>
        <section className={styles.section}>
          <Image
            src="/eskcaST8S_y1xbULqqsCqQ.webp"
            alt="Image 1"
            width={450}
            height={500}
            quality={75}
            priority
            className={styles.image}
            placeholder="blur"
            blurDataURL="data:image/webp;base64,..."
          />
          <button onClick={handleClick} className={styles.button}>
            Jouer
          </button>
        </section>
      </main>
    </div>
  );
}
