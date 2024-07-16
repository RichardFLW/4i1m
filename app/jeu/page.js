"use client"

import { useEffect, useState } from 'react';
import { getImagesByKeyword } from '../../services/pexelsService';
import Image from 'next/image';

const GamePage = () => {
  const [images, setImages] = useState([]);
  const [keyword, setKeyword] = useState('nature'); // Exemple de mot-clé

  useEffect(() => {
    const fetchImages = async () => {
      const imgs = await getImagesByKeyword(keyword);
      setImages(imgs);
    };

    fetchImages();
  }, [keyword]);

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-100">
        <h1 className="text-4xl font-bold mb-5">Trouvez le mot correspondant</h1>
        <div className="grid grid-cols-2 gap-4">
          {images.map((img) => (
            <div key={img.id} className="max-w-xs mx-auto">
              <Image src={img.src.medium} alt={img.alt} width={300} height={300} className="rounded-lg shadow-lg" />
            </div>
          ))}
        </div>
        {/* Ajouter un champ de saisie et un bouton pour vérifier la réponse */}
        <div className="mt-5">
          <input
            type="text"
            placeholder="Devinez le mot"
            className="p-2 border border-gray-300 rounded-lg"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            onClick={() => fetchImages()}
            className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Vérifier
          </button>
        </div>
      </main>
    </>
  );
};

export default GamePage;
