import Navbar from "./components/Navbar";
import "./globals.css";
import { Raleway, Merriweather } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"

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
      </head>
      <body>
        <SpeedInsights />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
