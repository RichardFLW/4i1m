import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { roboto_mono } from '../Config/fonts'

export default function Home() {
  return (
    <>
      <Head>
        <title>4 Images pour 1 Mot - Jeu de Devinettes</title>
        <meta name="description" content="Essayez de deviner le mot à partir de 4 images dans ce jeu amusant et stimulant !" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="">
        <section className="left-section">
          <h1 className="text-5xl font-bold mb-5 {roboto_mono.className}">Bienvenue sur 4 Images pour 1 Mot</h1>
          <p className="text-lg mb-5">
            Essayez de deviner le mot à partir de 4 images dans ce jeu amusant et stimulant. Cliquez sur le bouton ci-dessous pour commencer à jouer !
          </p>
          <Link href="/pagedejeu" className="bg-black hover:bg-white hover:text-black text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Jouer
          </Link>
        </section>
        <section className="right-section">
          <div className="max-w-xs mx-4 mb-8">
            <Image src="/pexels-shamia-casiano-183672-944743.jpg" alt="Exemple d'image" width={200} height={200} className="rounded-lg shadow-lg" />
          </div>
          <div className="max-w-xs mx-4 mb-8">
            <Image src="/pexels-leeloothefirst-5245218.jpg" alt="Exemple d'image" width={200} height={200} className="rounded-lg shadow-lg" />
          </div>
          <div className="max-w-xs mx-4 mb-8">
            <Image src="/pexels-anntarazevich-8016930.jpg" alt="Exemple d'image" width={200} height={200} className="rounded-lg shadow-lg" />
          </div>
          <div className="max-w-xs mx-4 mb-8">
            <Image src="/pexels-leeloothefirst-7173738.jpg" alt="Exemple d'image" width={200} height={200} className="rounded-lg shadow-lg" />
          </div>
        </section>
      </main>
    </>
  );
}
