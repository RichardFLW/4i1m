//app>layout.js

import Navbar from "./components/Navbar";
import "./globals.css";
import { Raleway, Merriweather } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${raleway.variable} ${merriweather.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>4 images pour 1 mot</title>
        <meta
          name="description"
          content="Venez jouer au jeu 4 images pour 1 mot, actuellement en développement. Devinez le mot commun à partir de quatre images."
        />
        <meta
          name="keywords"
          content="4 images 1 mot, jeu de mots, jeu de réflexion, jeu en développement"
        />

        <meta
          property="og:title"
          content="4 Images pour 1 Mot - Jeu en développement"
        />
        <meta
          property="og:description"
          content="Venez jouer au jeu 4 images pour 1 mot, actuellement en développement. Devinez le mot commun à partir de quatre images."
        />
        <meta property="og:image" content="https://4i1m.vercel.app/" />
        <meta property="og:url" content="https://4i1m.vercel.app/" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="4 Images pour 1 Mot - Jeu en développement"
        />
        <meta
          name="twitter:description"
          content="Venez jouer au jeu 4 images pour 1 mot, actuellement en développement. Devinez le mot commun à partir de quatre images."
        />
        <meta name="twitter:image" content="URL_DE_VOTRE_IMAGE_PRINCIPALE" />
      </head>
      <body>
        <SpeedInsights />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
