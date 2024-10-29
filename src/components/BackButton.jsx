// src/components/BackButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styling/BackButton.css"; // Add styles for the button

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="back-button" onClick={() => navigate(-1)}>
      &larr; Back
    </button>
  );
};

export default BackButton;
