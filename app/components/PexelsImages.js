"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import VirtualKeyboard from "./VirtualKeyboard";
import GuessField from "./GuessField";
import ResultMessage from "./ResultMessage";
import LoadingIndicator from "./LoadingIndicator";
import words from "./words"; // Importer la liste des mots
import "./PexelsImages.module.css"; // Assurez-vous de charger les styles CSS

const PexelsImages = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState(words[0]);
  const [inputValues, setInputValues] = useState(
    Array(words[0].length).fill("")
  );
  const [resultMessage, setResultMessage] = useState("");
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
            per_page: 4,
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

  return (
    <div className="page">
      {loading && <LoadingIndicator />}
      <div className={`content ${loading ? "blurred" : ""}`}>
        <div className="left-section">
          {images.length > 0 &&
            images.map((image, index) => (
              <div
                key={image.id}
                className={`img${index + 1}`}
                style={{
                  backgroundImage: `url(${image.src.medium})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            ))}
        </div>
        <div className="right-section">
          <h1 className="title">Devinez le Mot</h1>
          <form onSubmit={handleSubmit} className="searchContainer">
            <GuessField inputValues={inputValues} />
            <button type="submit">Valider</button>
          </form>
          <ResultMessage resultMessage={resultMessage} />
          <VirtualKeyboard
            correctWord={searchQuery}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </div>
  );
};

export default PexelsImages;
