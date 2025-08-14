// /app/survey-partial/page.js
"use client";

import { useState } from "react";

export default function SurveyPartial() {
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    // Save rating
    localStorage.setItem("partialRating", rating);
    // Go to feedback
    window.location.href = "/feedback";
  };

  return (
    <div style={styles.container}>
      <h2>Quick Feedback</h2>
      <p style={styles.description}>
        Before we show your insights — how was the experience so far?
      </p>

      <div style={styles.question}>
        <p><strong>How likely would you be to complete more questions?</strong></p>
        <div style={styles.rating}>
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              style={rating === num ? styles.ratingBtnSelected : styles.ratingBtn}
              onClick={() => setRating(num)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <button
        disabled={rating === 0}
        style={rating === 0 ? styles.buttonDisabled : styles.buttonCta}
        onClick={handleSubmit}
      >
        See My Results
      </button>
    </div>
  );
}

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
  },
  description: {
    fontSize: "18px",
    marginBottom: "30px",
  },
  question: {
    marginBottom: "40px",
  },
  rating: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "15px",
  },
  ratingBtn: {
    width: "60px",
    height: "60px",
    fontSize: "20px",
    border: "2px solid #0066cc",
    backgroundColor: "white",
    color: "#0066cc",
    borderRadius: "8px",
    cursor: "pointer",
  },
  ratingBtnSelected: {
    width: "60px",
    height: "60px",
    fontSize: "20px",
    backgroundColor: "#0066cc",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
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