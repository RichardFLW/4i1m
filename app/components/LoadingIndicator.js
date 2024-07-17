// components/LoadingIndicator.js

import React from "react";
import "./LoadingIndicator.module.css"; // Assurez-vous de charger les styles CSS

const LoadingIndicator = () => {
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingIndicator;
