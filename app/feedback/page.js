// /app/feedback/page.js
"use client";

import { useEffect, useState } from "react";

export default function Feedback() {
  const [qCount, setQCount] = useState(0);

  // Count how many questions were answered
  useEffect(() => {
    const count = Array.from({ length: 5 }, (_, i) => i + 1)
      .map(n => localStorage.getItem(`q${n}_video`))
      .filter(Boolean).length;
    setQCount(count);
  }, []);

  const name = localStorage.getItem("userName") || "there";

  // Mock metrics based on completion
  const readinessScore = qCount === 5 ? 78 : qCount >= 3 ? 65 : 50;
  const confidenceTrend = qCount >= 3 ? "improved 40%" : "moderate";
  const fillerWords = qCount >= 1 ? 8 : "n/a";
  const speakingPace = qCount >= 1 ? "140 words/min" : "n/a";

  return (
    <div style={styles.container}>
      <h1>Great job, {name}!</h1>
      <p>Here’s your AI-powered feedback report.</p>

      {/* Speaking Pace */}
      {qCount >= 1 && (
        <div style={styles.card}>
          <h3>🗣️ Speaking Pace</h3>
          <p>You spoke at ~{speakingPace} (ideal: 120–160 wpm).</p>
          <div style={styles.barChart}>
            <div style={{ ...styles.bar, width: "70%" }}></div>
          </div>
        </div>
      )}

      {/* Filler Words */}
      {qCount >= 1 && (
        <div style={styles.card}>
          <h3>🔇 Filler Words</h3>
          <p>&quot;Um&quot;, &quot;uh&quot; count: {fillerWords} times. Moderate — could improve with pauses.</p>
          <div style={styles.barChart}>
            <div style={{ ...styles.bar, width: "50%" }}></div>
          </div>
        </div>
      )}

      {/* Confidence Trend */}
      {qCount >= 3 && (
        <div style={styles.card}>
          <h3>📈 Confidence Trend</h3>
          <p>Your confidence {confidenceTrend} from Q1 to Q3.</p>
          <div style={styles.trendChart}>
            <svg width="100%" height="60" style={{ marginTop: "10px" }}>
              <polyline
                fill="none"
                stroke="#0066cc"
                strokeWidth="3"
                points="0,50 25,30 50,40 75,20 100,10"
              />
              <circle cx="100" cy="10" r="4" fill="#0066cc" />
            </svg>
          </div>
        </div>
      )}

      {/* PM Readiness Score */}
      {qCount === 5 && (
        <div style={styles.card}>
          <h3>🎯 PM Readiness Score: {readinessScore}/100</h3>
          <p><strong>Strengths:</strong> Clear communication, structured answers</p>
          <p><strong>Growth Areas:</strong> Storytelling impact, conciseness</p>
          <div style={styles.gauge}>
            <div style={styles.gaugeFill}></div>
            <div style={styles.gaugeLabel}>{readinessScore}</div>
          </div>
        </div>
      )}

      {/* Unlock Teasers */}
      {qCount <= 2 && (
        <div style={styles.locked}>
          <p>🔒 Complete 2 more questions for PM skills analysis + readiness score</p>
        </div>
      )}
      {qCount === 3 && (
        <div style={styles.locked}>
          <p>🔒 Complete all 5 for comprehensive PM profile + industry benchmarks</p>
        </div>
      )}

      <hr style={styles.divider} />

      {/* Email Capture */}
      <div style={styles.emailSection}>
        <h3>Want your complete AI profile?</h3>
        <p>Get visual insights, improvement roadmap, and benchmarks by email.</p>
        <input
          type="email"
          placeholder="your@email.com"
          style={styles.emailInput}
        />
        <button style={styles.emailBtn}>Get Full Report</button>
        <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
          Join 500+ PMs improving their interview skills
        </p>
      </div>

      {/* Actions */}
      <div style={styles.actions}>
        <button style={styles.secondary}>Try More Questions</button>
        <button style={styles.share}>Share This Tool</button>
      </div>
    </div>
  );
}

// ✅ Styles
const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    lineHeight: "1.6",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
    backgroundColor: "#f9f9f9",
  },
  barChart: {
    height: "20px",
    backgroundColor: "#eee",
    borderRadius: "10px",
    overflow: "hidden",
    marginTop: "10px",
  },
  bar: {
    height: "100%",
    backgroundColor: "#0066cc",
  },
  trendChart: {
    marginTop: "10px",
  },
  gauge: {
    width: "120px",
    height: "60px",
    border: "6px solid #0066cc",
    borderRadius: "60px 60px 0 0",
    position: "relative",
    margin: "20px auto",
    overflow: "hidden",
  },
  gaugeFill: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#0066cc",
    height: "70%",
    transform: "rotate(180deg)",
    borderRadius: "60px 60px 0 0",
  },
  gaugeLabel: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "24px",
    fontWeight: "bold",
    color: "white",
  },
  locked: {
    backgroundColor: "#fff8e1",
    border: "1px solid #ffd54f",
    borderRadius: "8px",
    padding: "15px",
    textAlign: "center",
    color: "#e65100",
    fontWeight: "bold",
    margin: "20px 0",
  },
  divider: {
    margin: "40px 0",
    border: "1px solid #eee",
  },
  emailSection: {
    textAlign: "center",
    marginBottom: "30px",
  },
  emailInput: {
    padding: "10px",
    width: "70%",
    maxWidth: "400px",
    marginRight: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
  },
  emailBtn: {
    padding: "10px 20px",
    backgroundColor: "#0066cc",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
  actions: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "30px",
  },
  secondary: {
    padding: "12px 20px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    backgroundColor: "white",
    cursor: "pointer",
  },
  share: {
    padding: "12px 20px",
    backgroundColor: "#0066cc",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
