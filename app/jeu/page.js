// app/jeu/page.js
"use client";

import React, { Suspense } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import GameLogic from "../components/GameLogic";

const JeuPage = () => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <GameLogic />
    </Suspense>
  );
};

export default JeuPage;
