// components/PexelsImages.js

"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VirtualKeyboard from './VirtualKeyboard';
import './PexelsImages.module.css'; // Assurez-vous de charger les styles CSS

const PexelsImages = () => {
  // État pour stocker les images récupérées de l'API Pexels
  const [images, setImages] = useState([]);
  
  // État pour stocker la requête de recherche, par défaut 'nature'
  const [searchQuery, setSearchQuery] = useState('bee');
  
  // État pour stocker les valeurs d'entrée pour chaque lettre du mot à deviner
  const [inputValues, setInputValues] = useState(Array(6).fill(''));
  
  // État pour stocker le message de résultat (correct ou incorrect)
  const [resultMessage, setResultMessage] = useState('');
  
  // Le mot correct que l'utilisateur doit deviner
  const [correctWord, setCorrectWord] = useState('nature');
  
  // Clé API pour accéder à l'API Pexels, stockée dans les variables d'environnement
  const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

  // useEffect pour récupérer les images de Pexels lorsque le composant est monté ou lorsque la requête de recherche change
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Appel API pour récupérer les images basées sur la requête de recherche
        const response = await axios.get(`https://api.pexels.com/v1/search`, {
          headers: {
            Authorization: apiKey
          },
          params: {
            query: searchQuery,
            per_page: 4
          }
        });
        // Mise à jour de l'état des images avec les données récupérées
        setImages(response.data.photos);
        // Mettre à jour le mot correct et les valeurs d'entrée en fonction de la nouvelle requête
        setCorrectWord(searchQuery);
        setInputValues(Array(searchQuery.length).fill(''));
      } catch (error) {
        // Gestion des erreurs lors de la récupération des images
        console.error('Erreur lors de la récupération des images de Pexels:', error);
      }
    };

    fetchImages();
  }, [searchQuery]);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Vérification si le mot deviné est correct
    if (inputValues.join('').toLowerCase() === correctWord.toLowerCase()) {
      setResultMessage('Correct! Bien joué.');
    } else {
      setResultMessage('Incorrect. Réessayez.');
    }
  };

  // Fonction pour gérer les pressions de touches sur le clavier virtuel
  const handleKeyPress = (key) => {
    if (key === 'BACKSPACE') {
      // Gestion de la touche de suppression
      const newInputValues = [...inputValues];
      for (let i = inputValues.length - 1; i >= 0; i--) {
        if (newInputValues[i] !== '') {
          newInputValues[i] = '';
          break;
        }
      }
      setInputValues(newInputValues);
    } else {
      // Ajout de la lettre pressée dans le tableau des valeurs d'entrée
      const newInputValues = [...inputValues];
      for (let i = 0; i < inputValues.length; i++) {
        if (newInputValues[i] === '') {
          newInputValues[i] = key;
          break;
        }
      }
      setInputValues(newInputValues);
    }
  };

  return (
    <div className="page">
      <div className="left-section">
        {/* Affichage des images récupérées de Pexels */}
        {images.length > 0 && images.map((image, index) => (
          <div
            key={image.id}
            className={`img${index + 1}`}
            style={{ backgroundImage: `url(${image.src.medium})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
        ))}
      </div>
      <div className="right-section">
        <h1 className="title">Devinez le Mot</h1>
        {/* Formulaire pour entrer les lettres du mot deviné */}
        <form onSubmit={handleSubmit} className="searchContainer">
          <div className="inputsContainer">
            {/* Champs d'entrée pour chaque lettre */}
            {inputValues.map((value, index) => (
              <input
                key={index}
                type="text"
                value={value}
                readOnly
                className="letterInput"
              />
            ))}
          </div>
          <button type="submit">Valider</button>
        </form>
        {/* Affichage du message de résultat */}
        {resultMessage && <div className="resultMessage">{resultMessage}</div>}
        {/* Clavier virtuel pour entrer les lettres */}
        <VirtualKeyboard correctWord={correctWord} onKeyPress={handleKeyPress} />
      </div>
    </div>
  );
};

export default PexelsImages;
