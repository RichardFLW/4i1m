// components/ResultMessage.js

import React from "react";
import "./ResultMessage.module.css"; // Assurez-vous de charger les styles CSS

const ResultMessage = ({ resultMessage }) => {
  return resultMessage && <div className="resultMessage">{resultMessage}</div>;
};

export default ResultMessage;
