"use client"
import { useEffect, useState } from 'react';
import { getRateLimitStats } from '../../services/pexelsService';

const StatsPage = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const rateLimitStats = await getRateLimitStats();
      setStats(rateLimitStats);
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <>
        <main className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-100">
          <h1 className="text-4xl font-bold mb-5">Statistiques de l'API</h1>
          <p>Chargement des statistiques...</p>
        </main>
      </>
    );
  }

  const resetDate = new Date(stats.reset * 1000).toLocaleString();

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-100">
        <h1 className="text-4xl font-bold mb-5">Statistiques de l'API Pexels</h1>
        <div className="bg-white shadow-md rounded-lg p-5">
          <p><strong>Limite de demandes mensuelle:</strong> {stats.limit}</p>
          <p><strong>Demandes restantes:</strong> {stats.remaining}</p>
          <p><strong>Réinitialisation du quota:</strong> {resetDate}</p>
        </div>
      </main>
    </>
  );
};

export default StatsPage;
