// app/pages/index.jsx (ou home.jsx)
"use client";

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const FloatingShapes = dynamic(() => import('./components/FloatingShapes'), { ssr: false });

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/select-language");
  };

  return (
    <div className={styles.main}>
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
    </div>
  );
}
