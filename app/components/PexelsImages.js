// app/pages/jeu.js
"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import VirtualKeyboard from "../components/VirtualKeyboard";
import GuessInputs from "../components/GuessInputs";
import LoadingIndicator from "../components/LoadingIndicator";
import words from "../components/words";
import styles from "../components/PexelsImages.module.css";
import ResultModal from "../components/ResultModal";
import Image from "next/image";

// Composant principal pour afficher les images et gérer le jeu
const PexelsImages = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const language = searchParams.get("lang") || "en";
  const initialIndex = parseInt(searchParams.get("index")) || 0;

  // États pour gérer les images, l'index actuel, la requête de recherche, les valeurs des entrées, etc.
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [searchQuery, setSearchQuery] = useState(words["en"][initialIndex]);
  const [inputValues, setInputValues] = useState(Array(words[language][initialIndex].length).fill(""));
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const nextImagesRef = useRef([]); // Utilisation de useRef pour stocker les images préchargées
  const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY; // Clé API pour accéder à l'API Pexels

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.pexels.com/v1/search`, {
          headers: { Authorization: apiKey },
          params: { query: searchQuery, per_page: 4 },
        });
        setImages(response.data.photos); // Mise à jour de l'état `images`
      } catch (error) {
        console.error("Erreur lors de la récupération des images de Pexels:", error);
      } finally {
        setLoading(false); // Désactiver le chargement une fois les images récupérées
      }
    };

    fetchImages();

    if (currentIndex < words["en"].length - 1) {
      const cancelTokenSource = axios.CancelToken.source(); // Création d'un token pour annuler la requête si nécessaire
      axios
        .get(`https://api.pexels.com/v1/search`, {
          headers: { Authorization: apiKey },
          params: { query: words["en"][currentIndex + 1], per_page: 4 },
          cancelToken: cancelTokenSource.token,
        })
        .then((response) => {
          nextImagesRef.current = response.data.photos; // Stockage des images préchargées
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log("Préchargement annulé");
          } else {
            console.error("Erreur lors du préchargement des images:", error);
          }
        });

      return () => {
        cancelTokenSource.cancel();
      };
    }
  }, [searchQuery, currentIndex, apiKey]);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValues.join("").toLowerCase() === words[language][currentIndex].toLowerCase()) {
      setModalMessage("Bravo ! C'est correct.");
      setIsSuccess(true);
      const nextIndex = (currentIndex + 1) % words[language].length;
      localStorage.setItem(`gameState-${language}`, JSON.stringify({ currentIndex: nextIndex }));
      setCurrentIndex(nextIndex);
      setSearchQuery(words["en"][nextIndex]);
      setInputValues(Array(words[language][nextIndex].length).fill(""));
    } else {
      setModalMessage("Oups... Ce n'est pas ça. Réessaie !");
      setIsSuccess(false);
    }
    setShowModal(true);
  };

  const handleKeyPress = (key) => {
    if (key === "BACKSPACE") {
      const newInputValues = [...inputValues];
      for (let i = inputValues.length - 1; i >= 0; i--) {
        if (newInputValues[i] !== "") {
          newInputValues[i] = "";
          break;
        }
      }
      setInputValues(newInputValues);
    } else if (key === "SUBMIT") {
      handleSubmit(new Event("submit"));
    } else {
      const newInputValues = [...inputValues];
      for (let i = 0; i < inputValues.length; i++) {
        if (newInputValues[i] === "") {
          newInputValues[i] = key;
          break;
        }
      }
      setInputValues(newInputValues);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (!isSuccess) {
      setInputValues(Array(words[language][currentIndex].length).fill(""));
    }
  };

  return (
    <div className={styles.page}>
      {loading && <LoadingIndicator />}
      <div className={styles.imageContainer}>
        {images.map((image, index) => (
          <div key={index} className={styles.imageWrapper}>
            <Image src={image.src.medium} alt={`Image ${index}`} className={styles.image} width={300} height={300} />
          </div>
        ))}
      </div>
      <div className={styles.inputsAndKeyboard}>
        <h1 className={styles.title}>
          Devinez le mot {language === "fr" ? "français" : "anglais"} :
        </h1>
        <form onSubmit={handleSubmit}>
          <GuessInputs inputValues={inputValues} />
        </form>
        <VirtualKeyboard correctWord={words[language][currentIndex]} onKeyPress={handleKeyPress} />
      </div>
      <ResultModal isOpen={showModal} message={modalMessage} isSuccess={isSuccess} onClose={handleCloseModal} />
    </div>
  );
};

export default PexelsImages;
