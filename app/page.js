// /app/page.js
"use client";

import { useState } from "react";

export default function Home() {
  const [selectedLevel, setSelectedLevel] = useState("");

  const handleStart = () => {
    if (!selectedLevel) return;

    // Save skill level
    localStorage.setItem("skillLevel", selectedLevel);

    // Go to setup
    window.location.href = "/setup";
  };

  return (
    <div style={styles.container}>
      {/* Headline */}
      <h1 style={styles.headline}>
        Practice PM interviews with AI feedback — get results in minutes
      </h1>

      {/* Skill Level Buttons */}
      <div style={styles.buttonGroup}>
        <button
          style={
            selectedLevel === "beginner"
              ? { ...styles.button, ...styles.selected }
              : styles.button
          }
          onClick={() => setSelectedLevel("beginner")}
        >
          Beginner
        </button>

        <button
          style={
            selectedLevel === "intermediate"
              ? { ...styles.button, ...styles.selected }
              : styles.button
          }
          onClick={() => setSelectedLevel("intermediate")}
        >
          Intermediate
        </button>
      </div>

      {/* Start Button */}
      <button
        disabled={!selectedLevel}
        style={!selectedLevel ? styles.buttonDisabled : styles.buttonCta}
        onClick={handleStart}
      >
        Start Practice
      </button>
    </div>
  );
}

// Clean styles
const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "0 auto",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    lineHeight: "1.6",
  },
  headline: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "40px",
  },
  buttonGroup: {
    marginBottom: "30px",
    display: "flex",
    gap: "20px",
    justifyContent: "center",
  },
  button: {
    padding: "15px 30px",
    fontSize: "18px",
    border: "2px solid #0066cc",
    backgroundColor: "white",
    color: "#0066cc",
    borderRadius: "8px",
    cursor: "pointer",
    width: "160px",
  },
  selected: {
    backgroundColor: "#0066cc",
    color: "white",
  },
  buttonCta: {
    padding: "16px 40px",
    fontSize: "20px",
    backgroundColor: "#0066cc",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  buttonDisabled: {
    padding: "16px 40px",
    fontSize: "20px",
    backgroundColor: "#cccccc",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "not-allowed",
    fontWeight: "bold",
  },
};
