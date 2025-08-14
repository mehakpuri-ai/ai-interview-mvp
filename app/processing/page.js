// /app/processing/page.js
"use client";

import { useEffect, useState } from "react";

export default function Processing() {
  const [progress, setProgress] = useState(0);

  // Simulate AI processing stages
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Go to feedback after ~5 seconds (simulate 30-45s later with real AI)
          setTimeout(() => {
            window.location.href = "/feedback";
          }, 1000);
          return 100;
        }
        return prev + 5;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.container}>
      <h1>AI Feedback in Progress</h1>
      <p>
        Analyzing your answers with AI... Creating your visual feedback report
      </p>
      <p>
        Processing speech patterns, confidence analysis, and PM-specific
        insights...
      </p>

      {/* Progress Bar */}
      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${progress}%` }}></div>
      </div>

      <p>{progress === 100 ? "Almost there..." : `This takes 30–45 seconds`}</p>
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
  progressBar: {
    height: "12px",
    backgroundColor: "#eee",
    borderRadius: "6px",
    overflow: "hidden",
    margin: "30px 0",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#0066cc",
    transition: "width 0.2s ease",
  },
};
