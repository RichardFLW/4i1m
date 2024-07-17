"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import VirtualKeyboard from "./VirtualKeyboard";
import GuessInputs from "./GuessInputs";
import ResultMessage from "./ResultMessage";
import LoadingIndicator from "./LoadingIndicator";
import words from "./words";
import styles from "./PexelsImages.module.css"; // Importer le fichier CSS

const PexelsImages = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState(words[0]);
  const [inputValues, setInputValues] = useState(
    Array(words[0].length).fill("")
  );
  const [resultMessage, setResultMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.pexels.com/v1/search`, {
          headers: {
            Authorization: apiKey,
          },
          params: {
            query: searchQuery,
            per_page: 4, // Modifier ici pour obtenir 4 images
          },
        });
        setImages(response.data.photos);
        setLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des images de Pexels:",
          error
        );
        setLoading(false);
      }
    };

    fetchImages();
  }, [searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValues.join("").toLowerCase() === searchQuery.toLowerCase()) {
      setResultMessage("Correct! Bien joué.");
      setIsSuccess(true);
      setLoading(true);
      setTimeout(() => {
        const nextIndex = (currentIndex + 1) % words.length;
        setCurrentIndex(nextIndex);
        setSearchQuery(words[nextIndex]);
        setInputValues(Array(words[nextIndex].length).fill(""));
        setResultMessage("");
        setLoading(false);
      }, 2000);
    } else {
      setResultMessage("Incorrect. Réessayez.");
      setIsSuccess(false);
    }
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

  const handleCloseMessage = () => {
    setResultMessage("");
  };

  return (
    <div className={styles.page}>
      {loading && <LoadingIndicator />}
      <div className={styles.imageContainer}>
        {images.map((image, index) => (
          <div key={index} className={styles.imageWrapper}>
            <img
              src={image.src.medium}
              alt={`Image ${index}`}
              className={styles.image}
            />
          </div>
        ))}
      </div>
      <div className={styles.inputsAndKeyboard}>
        <h1 className={styles.title}>Devinez le Mot</h1>
        <form onSubmit={handleSubmit}>
          <GuessInputs inputValues={inputValues} />
        </form>
        {resultMessage && (
          <ResultMessage message={resultMessage} isSuccess={isSuccess} />
        )}
        <VirtualKeyboard
          correctWord={searchQuery}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default PexelsImages;
