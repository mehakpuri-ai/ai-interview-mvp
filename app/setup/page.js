// /app/setup/page.js
"use client";

import { useState } from "react";

export default function Setup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) localStorage.setItem("userName", name);
    if (email) localStorage.setItem("userEmail", email);
    setSubmitted(true);
    // Redirect after 1 second
    setTimeout(() => {
      window.location.href = "/question/1";
    }, 1000);
  };

  const handleSkip = () => {
    localStorage.setItem("emailSkipped", "true");
    window.location.href = "/question/1";
  };

  return (
    <div style={styles.container}>
      <h2>Get Instant AI Feedback</h2>
      <p style={styles.description}>
        Answer up to 5 PM questions. Skip any you want. Get instant AI feedback.
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Your email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.cta}>
            Start Questions
          </button>
        </form>
      ) : (
        <p>✅ Great! Starting your first question...</p>
      )}

      <button onClick={handleSkip} style={styles.skip}>
        Skip for now
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
  form: {
    marginBottom: "20px",
  },
  input: {
    display: "block",
    width: "80%",
    maxWidth: "400px",
    padding: "12px",
    margin: "10px auto",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  cta: {
    padding: "12px 24px",
    fontSize: "18px",
    backgroundColor: "#0066cc",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  skip: {
    marginTop: "20px",
    color: "#666",
    background: "none",
    border: "none",
    textDecoration: "underline",
    cursor: "pointer",
  },
};
