// /app/question/[id]/page.js
"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

export default function Question() {
  const params = useParams();
  const videoRef = useRef(null); // For self-preview
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);

  const [showQuestionVideo, setShowQuestionVideo] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [recording, setRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [videoUrl, setVideoUrl] = useState("");

  // Question videos by skill level
  const questionVideos = {
    beginner: [
      "/video/B1.mp4",
      "/video/B2.mp4",
      "/video/B3.mp4",
      "/video/B4.mp4",
      "/video/B5.mp4",
    ],
    intermediate: [
      "/video/I1.mp4",
      "/video/I2.mp4",
      "/video/I3.mp4",
      "/video/I4.mp4",
      "/video/I5.mp4",
    ],
  };

  // Get skill level and question number
  const skillLevel =
    typeof window !== "undefined"
      ? localStorage.getItem("skillLevel") || "beginner"
      : "beginner";
  const qNum = params.id ? parseInt(params.id) : 1;
  const videoSrc = questionVideos[skillLevel]?.[qNum - 1] || "/video/q1.mp4";

  // Auto-play question video
  useEffect(() => {
    if (showQuestionVideo) {
      const vid = document.getElementById("question-video");
      if (vid) {
        vid.play().catch((e) => console.log("Auto-play blocked:", e));
      }
    }
  }, [showQuestionVideo]);

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;

      setCountdown(3);
      const countdownTimer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownTimer);
            beginCapture();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      alert("Error accessing camera/mic: " + err.message);
    }
  };

  // Begin actual recording
  const beginCapture = () => {
    const mediaRecorder = new MediaRecorder(streamRef.current, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        const blob = new Blob([e.data], { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        localStorage.setItem(`q${qNum}_video`, url);
        localStorage.setItem(`q${qNum}_timestamp`, new Date().toISOString());
      }
    };

    mediaRecorder.onstart = () => {
      setTimeLeft(180);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (timerRef.current) clearInterval(timerRef.current);
    setRecording(false);
  };

  // Go to next question
  const nextQuestion = () => {
    if (qNum < 5) {
      window.location.href = `/question/${qNum + 1}`;
    } else {
      window.location.href = `/processing`;
    }
  };

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div style={styles.container}>
      {/* Step 1: Play Pre-Recorded Question Video */}
      {showQuestionVideo && (
        <div style={styles.step}>
          <h3>Question {qNum} of 5</h3>
          <video
            id="question-video"
            src={videoSrc}
            controls
            style={styles.video}
            onEnded={() => setShowQuestionVideo(false)}
          />
          <button
            onClick={() => setShowQuestionVideo(false)}
            style={styles.skipBtn}
          >
            Skip Video
          </button>
        </div>
      )}

      {/* Step 2: Record Answer */}
      {!showQuestionVideo && !recording && countdown === 0 && !videoUrl && (
        <div style={styles.step}>
          <h3>Now it’s your turn!</h3>
          <p>
            <strong>You have 3 minutes to answer.</strong>
          </p>
          <button onClick={startRecording} style={styles.recordBtn}>
            Record Answer
          </button>
        </div>
      )}

      {/* 3-2-1 Countdown */}
      {countdown > 0 && (
        <div style={styles.countdown}>
          🎥 Recording starts in {countdown}...
        </div>
      )}

      {/* Recording Active + Self-Preview */}
      {recording && (
        <div style={styles.recording}>
          <video ref={videoRef} autoPlay muted style={styles.selfPreview} />
          <div style={styles.timer}>Time left: {formatTime(timeLeft)}</div>
          <button onClick={stopRecording} style={styles.stopBtn}>
            Stop Recording
          </button>
          {timeLeft <= 30 && (
            <p style={{ color: "orange" }}>⏰ Less than 30 seconds left!</p>
          )}
        </div>
      )}

      {/* Show Recorded Video */}
      {videoUrl && !recording && (
        <div style={styles.review}>
          <h3>✅ Your Answer</h3>
          <video src={videoUrl} controls style={styles.reviewVideo} />
        </div>
      )}

      {/* Navigation */}
      {!recording && (
        <div style={styles.actions}>
          <button
            onClick={() => (window.location.href = "/feedback-partial")}
            style={styles.skipBtn}
          >
            Get My Feedback Now
          </button>
          <button onClick={nextQuestion} style={styles.nextBtn}>
            {qNum < 5 ? "Next Question" : "Finish & See Feedback"}
          </button>
        </div>
      )}
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
  },
  step: {
    textAlign: "center",
    marginBottom: "30px",
  },
  video: {
    width: "100%",
    maxWidth: "600px",
    borderRadius: "8px",
  },
  skipBtn: {
    display: "block",
    margin: "20px auto",
    color: "#666",
    background: "none",
    border: "none",
    textDecoration: "underline",
    cursor: "pointer",
  },
  recordBtn: {
    padding: "15px 30px",
    fontSize: "18px",
    backgroundColor: "#d32f2f",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  countdown: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#0066cc",
    textAlign: "center",
    margin: "40px 0",
  },
  recording: {
    textAlign: "center",
    marginBottom: "30px",
  },
  selfPreview: {
    width: "100%",
    maxWidth: "400px",
    borderRadius: "8px",
    border: "3px solid #0066cc",
  },
  timer: {
    fontSize: "20px",
    margin: "10px 0",
  },
  stopBtn: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  review: {
    textAlign: "center",
    marginBottom: "30px",
  },
  reviewVideo: {
    width: "100%",
    maxWidth: "600px",
    borderRadius: "8px",
  },
  actions: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "space-between",
  },
  nextBtn: {
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#0066cc",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
