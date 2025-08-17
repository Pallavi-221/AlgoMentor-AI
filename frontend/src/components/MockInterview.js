import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";

const MockInterview = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [error, setError] = useState("");

  const { speak, speaking, cancel } = useSpeechSynthesis();
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  // Keep answer synced with transcript
  useEffect(() => {
    setAnswer(transcript);
  }, [transcript]);

  const startInterview = async () => {
    try {
      setError("");
      resetTranscript();
      SpeechRecognition.stopListening();
      cancel(); // stop any ongoing speech

      const res = await fetch("http://localhost:5000/mock-interview/start");
      if (!res.ok) throw new Error("Failed to connect to server");

      const data = await res.json();
      setQuestion(data.question || "No question received.");
      speak({ text: data.question });
      setIsInterviewStarted(true);
      setFeedback("");
    } catch (err) {
      console.error("Error starting interview:", err);
      setError("⚠️ Could not start interview. Please ensure backend is running.");
    }
  };

  const sendAnswer = async () => {
    try {
      setError("");
      SpeechRecognition.stopListening();
      cancel();

      const res = await fetch("http://localhost:5000/mock-interview/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer }),
      });

      if (!res.ok) throw new Error("Failed to send answer");

      const data = await res.json();

      if (data.question) {
        setQuestion(data.question);
        speak({ text: data.question });
        setAnswer("");
        resetTranscript();
      } else if (data.feedback) {
        setFeedback(data.feedback);
        speak({ text: "Here is your feedback: " + data.feedback });
        setIsInterviewStarted(false);
      }
    } catch (err) {
      console.error("Error sending answer:", err);
      setError("⚠️ Could not send answer. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "650px", margin: "auto" }}>
      <h2>🎤 AI Voice Mock Interview</h2>
      <p style={{ color: "gray" }}>
        Your AI interviewer will ask questions aloud. You can speak or type your answers.
      </p>

      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

      {!isInterviewStarted && !feedback && (
        <button onClick={startInterview} style={{ padding: "10px 15px" }}>
          Start Interview
        </button>
      )}

      {isInterviewStarted && (
        <div>
          <h3>{question}</h3>

          <textarea
            rows="4"
            style={{ width: "100%", margin: "10px 0" }}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <div>
            {!listening ? (
              <button
                onClick={() =>
                  SpeechRecognition.startListening({ continuous: true, language: "en-US" })
                }
                style={{ padding: "10px 15px", marginRight: "10px" }}
              >
                🎙 Start Speaking
              </button>
            ) : (
              <button
                onClick={SpeechRecognition.stopListening}
                style={{
                  padding: "10px 15px",
                  marginRight: "10px",
                  backgroundColor: "#ff4d4d",
                  color: "white",
                }}
              >
                ⏹ Stop Speaking
              </button>
            )}

            <button onClick={sendAnswer} style={{ padding: "10px 15px" }}>
              Submit Answer
            </button>
          </div>

          {listening && <p style={{ color: "green" }}>🎧 Listening...</p>}
          {speaking && <p style={{ color: "blue" }}>🗣 Speaking...</p>}
        </div>
      )}

      {feedback && (
        <div style={{ marginTop: "20px", background: "#f0f0f0", padding: "15px", borderRadius: "8px" }}>
          <h3>Interview Feedback</h3>
          <p>{feedback}</p>
          <button onClick={startInterview} style={{ padding: "10px 15px", marginTop: "10px" }}>
            Restart Interview
          </button>
        </div>
      )}
    </div>
  );
};

export default MockInterview;
