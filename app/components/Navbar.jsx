// app/components/Navbar.jsx
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Vérifie si une série a été commencée en vérifiant le localStorage
    const savedState = JSON.parse(localStorage.getItem('gameState'));
    if (savedState) {
      setHasStarted(true);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleRestart = () => {
    localStorage.removeItem('gameState');
    window.location.reload();
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
          {hasStarted && (
            <li>
              <button
                className={`${styles.menuItem} ${styles.restartButton}`}
                onClick={handleRestart}
              >
                Recommencer
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
