"use client";

import { useSearchParams } from "next/navigation";
import PexelsImages from "../components/PexelsImages";
import { Suspense, useEffect, useState } from "react";

const JeuPage = () => {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const [language, setLanguage] = useState(null);

  useEffect(() => {
    if (lang) {
      setLanguage(lang);
    } else {
      // Rediriger vers la page de sélection de langue si "lang" n'est pas défini
      window.location.href = "/select-language";
    }
  }, [lang]);

  if (!language) return null;

  return <PexelsImages language={language} />;
};

const JeuPageWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JeuPage />
    </Suspense>
  );
};

export default JeuPageWrapper;
