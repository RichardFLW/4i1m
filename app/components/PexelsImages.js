//app /components/PexelsImages.js

"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import VirtualKeyboard from "./VirtualKeyboard";
import GuessInputs from "./GuessInputs";
import LoadingIndicator from "./LoadingIndicator";
import words from "./words";
import styles from "./PexelsImages.module.css";
import ResultModal from "./ResultModal";
import Image from 'next/image';

const PexelsImages = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState(words[0]);
  const [inputValues, setInputValues] = useState(Array(words[0].length).fill(""));
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const nextImagesRef = useRef([]); // Stockage des images préchargées dans un useRef
  const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;



  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.pexels.com/v1/search`, {
          headers: { Authorization: apiKey },
          params: { query: searchQuery, per_page: 4 },
        });
        setImages(response.data.photos);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des images de Pexels:", error);
        setLoading(false);
      }
    };

    fetchImages();

     // Préchargement des images suivantes
     if (currentIndex < words.length - 1) {
      const cancelTokenSource = axios.CancelToken.source(); // Pour annuler la requête si nécessaire

      axios.get(`https://api.pexels.com/v1/search`, {
        headers: { Authorization: apiKey },
        params: { query: words[currentIndex + 1], per_page: 4 },
        cancelToken: cancelTokenSource.token,
      })
      .then(response => {
        nextImagesRef.current = response.data.photos;
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log("Préchargement annulé");
        } else {
          console.error("Erreur lors du préchargement des images:", error);
        }
      });

      // Annuler le préchargement si le composant est démonté ou si l'index change
      return () => {
        cancelTokenSource.cancel(); 
      };
    }
  }, [searchQuery, currentIndex]); // Dépendances pour déclencher le préchargement


  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValues.join("").toLowerCase() === searchQuery.toLowerCase()) {
      setModalMessage("Bravo ! C'est correct.");
      setIsSuccess(true);
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

    if (isSuccess) {
      setLoading(true);
      setTimeout(() => {
        const nextIndex = (currentIndex + 1) % words.length;
        setCurrentIndex(nextIndex);
        setSearchQuery(words[nextIndex]);
        setInputValues(Array(words[nextIndex].length).fill(""));

        // Utiliser les images préchargées s'il y en a
        if (nextImagesRef.current.length > 0) {
          setImages(nextImagesRef.current);
          nextImagesRef.current = []; // Réinitialiser
        } else {
          fetchImages(); 
        }

        setLoading(false);
      }, 200); 
    } else {
      setInputValues(Array(searchQuery.length).fill(""));
    }
  };



  return (
    <div className={styles.page}>
      {loading && <LoadingIndicator />}
      <div className={styles.imageContainer}>
  {images.map((image, index) => (
    <div key={index} className={styles.imageWrapper}>
      <Image
        src={image.src.medium}
        alt={`Image ${index}`}
        className={styles.image}
        width={300} // Spécifiez la largeur (obligatoire)
        height={300} // Spécifiez la hauteur (obligatoire)
      />
    </div>
        ))}
      </div>
      <div className={styles.inputsAndKeyboard}>
        <h1 className={styles.title}>Devinez le Mot</h1>
        <form onSubmit={handleSubmit}>
          <GuessInputs inputValues={inputValues} />
        </form>
       
        <VirtualKeyboard
          correctWord={searchQuery}
          onKeyPress={handleKeyPress}
        />
      </div>
      <ResultModal 
        isOpen={showModal} 
        message={modalMessage} 
        isSuccess={isSuccess} 
        onClose={handleCloseModal} 
      />
    </div>
    
  );
};

export default PexelsImages;
