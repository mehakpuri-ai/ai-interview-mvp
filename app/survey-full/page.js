// /app/survey-full/page.js
"use client";

import { useState } from "react";

export default function SurveyFull() {
  const [usefulness, setUsefulness] = useState(0);
  const [mostValuable, setMostValuable] = useState([]);
  const [returnIntent, setReturnIntent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save responses
    localStorage.setItem("usefulness", usefulness);
    localStorage.setItem("mostValuable", JSON.stringify(mostValuable));
    localStorage.setItem("returnIntent", returnIntent);
    // Go to thank you
    window.location.href = "/thank-you";
  };

  const toggleValuable = (item) => {
    setMostValuable(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  return (
    <div style={styles.container}>
      <h2>Thanks for Completing!</h2>
      <p style={styles.description}>
        Help us improve by answering a few quick questions.
      </p>

      <div style={styles.question}>
        <p><strong>How useful was your AI feedback?</strong></p>
        <div style={styles.rating}>
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              style={usefulness === num ? styles.ratingBtnSelected : styles.ratingBtn}
              onClick={() => setUsefulness(num)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.question}>
        <p><strong>What was most valuable?</strong> (Select all)</p>
        {["Visual insights", "Written feedback", "PM-specific advice", "Time management"].map((item) => (
          <label key={item} style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={mostValuable.includes(item)}
              onChange={() => toggleValuable(item)}
              style={styles.checkbox}
            />
            {item}
          </label>
        ))}
      </div>

      <div style={styles.question}>
        <p><strong>Would you practice more questions if available?</strong></p>
        {["Yes", "Maybe", "No"].map((option) => (
          <label key={option} style={styles.radioLabel}>
            <input
              type="radio"
              name="returnIntent"
              value={option}
              checked={returnIntent === option}
              onChange={(e) => setReturnIntent(e.target.value)}
              style={styles.radio}
            />
            {option}
          </label>
        ))}
      </div>

      <button
        disabled={!usefulness || !returnIntent}
        style={!usefulness || !returnIntent ? styles.buttonDisabled : styles.buttonCta}
        onClick={handleSubmit}
      >
        Submit & See Results
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
  },
  description: {
    fontSize: "18px",
    marginBottom: "30px",
  },
  question: {
    marginBottom: "30px",
    textAlign: "left",
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
  checkboxLabel: {
    display: "block",
    margin: "8px 0",
    fontSize: "16px",
  },
  checkbox: {
    marginRight: "8px",
  },
  radioLabel: {
    display: "block",
    margin: "8px 0",
    fontSize: "16px",
  },
  radio: {
    marginRight: "8px",
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
