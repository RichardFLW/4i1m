"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Fermer le menu
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
        <ul
          className={`${styles.menuItems} ${isOpen ? styles.menuItemsOpen : ""}`}
        >
          <li>
            <Link
              href="/"
              className={`${styles.menuItem} ${
                pathname === "/" ? styles.menuItemActive : ""
              }`}
              onClick={handleLinkClick}
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              href="/jeu"
              className={`${styles.menuItem} ${
                pathname === "/jeu" ? styles.menuItemActive : ""
              }`}
              onClick={handleLinkClick}
            >
              Le Jeu
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
