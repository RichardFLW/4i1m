// app/components/Navbar.js

"use client";
import React, { useState } from "react";
import { FaHome, FaGamepad, FaChartBar, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div className="text-lg font-bold">4 Images 1 Mot</div>
        <button onClick={toggleMenu} className={styles.menuButton}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <ul
          className={`${styles.menuItems} ${
            isOpen ? styles.menuItemsOpen : ""
          }`}
        >
          <li>
            <Link
              href="/"
              className={`${styles.menuItem} ${
                pathname === "/" ? styles.menuItemActive : ""
              }`}
            >
              <FaHome className="mr-2" /> Accueil
            </Link>
          </li>
          <li>
            <Link
              href="/jeu"
              className={`${styles.menuItem} ${
                pathname === "/jeu" ? styles.menuItemActive : ""
              }`}
            >
              <FaGamepad className="mr-2" /> Le Jeu
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
