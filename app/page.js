import Link from 'next/link';
import Navbar from './components/Navbar';
import Image from 'next/image';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>4 Images pour 1 Mot - Jeu de Devinettes</title>
        <meta name="description" content="Essayez de deviner le mot à partir de 4 images dans ce jeu amusant et stimulant !" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-100">
        <section className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-5">Bienvenue à 4 Images pour 1 Mot</h1>
          <p className="text-lg mb-5">
            Essayez de deviner le mot à partir de 4 images dans ce jeu amusant et stimulant. Cliquez sur le bouton ci-dessous pour commencer à jouer !
          </p>
          <Link href="/pagedejeu" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Jouer
          </Link>
        </section>
        <section className="flex flex-wrap justify-center">
          <div className="max-w-xs mx-4 mb-8">
            <Image src="/pexels-shamia-casiano-183672-944743.jpg" alt="Exemple d'image" width={300} height={300} className="rounded-lg shadow-lg" />
          </div>
          <div className="max-w-xs mx-4 mb-8">
            <Image src="/pexels-leeloothefirst-5245218.jpg" alt="Exemple d'image" width={300} height={300} className="rounded-lg shadow-lg" />
          </div>
          <div className="max-w-xs mx-4 mb-8">
            <Image src="/pexels-anntarazevich-8016930.jpg" alt="Exemple d'image" width={300} height={300} className="rounded-lg shadow-lg" />
          </div>
          <div className="max-w-xs mx-4 mb-8">
            <Image src="/pexels-leeloothefirst-7173738.jpg" alt="Exemple d'image" width={300} height={300} className="rounded-lg shadow-lg" />
          </div>
        </section>
      </main>
    </>
  );
}
