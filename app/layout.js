import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "4i1m",
  description: "Célébre jeu, trouve 1 mot à partir de 4 images",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Navbar />
        {children}</body>
    </html>
  );
}
