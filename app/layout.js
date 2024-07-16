// app/layout.js or app/layout.tsx

import Navbar from './components/Navbar';
import './globals.css';
import { Raleway, Merriweather } from 'next/font/google';

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
      <body>
        <Navbar/>{children}</body>
    </html>
  );
}
