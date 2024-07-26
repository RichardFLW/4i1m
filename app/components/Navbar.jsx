// app/components/Navbar.jsx
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    const savedCoins = localStorage.getItem('coins');
    if (savedCoins) {
      setCoins(parseInt(savedCoins, 10));
    }

    const handleCoinsUpdated = () => {
      const updatedCoins = localStorage.getItem('coins');
      if (updatedCoins) {
        setCoins(parseInt(updatedCoins, 10));
      }
    };

    window.addEventListener('coinsUpdated', handleCoinsUpdated);

    return () => {
      window.removeEventListener('coinsUpdated', handleCoinsUpdated);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div className="text-lg font-bold">4 Images 1 Mot</div>
        <button
          onClick={toggleMenu}
          className={`${styles.menuButton} ${isOpen ? styles.open : ""}`}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <div></div>
          <div></div>
          <div></div>
        </button>
        <ul className={`${styles.menuItems} ${isOpen ? styles.menuItemsOpen : ""}`}>
          <li>
            <Link
              href="/"
              className={`${styles.menuItem} ${pathname === "/" ? styles.menuItemActive : ""}`}
              onClick={handleLinkClick}
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              href="/select-language"
              className={`${styles.menuItem} ${pathname === "/select-language" ? styles.menuItemActive : ""}`}
              onClick={handleLinkClick}
            >
              Le Jeu
            </Link>
          </li>
        </ul>
        <div className={styles.coinsContainer}>
          <img src="/coin.svg" alt="Coins" className={styles.coinIcon} />
          <span className={styles.coinsCount}>{coins}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
