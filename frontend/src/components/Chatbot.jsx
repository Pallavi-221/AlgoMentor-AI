import React, { useState } from "react";
import axios from "axios";

function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/chatbot", {
        message: input,
      });

      if (response.data && response.data.reply) {
        setMessages((prev) => [...prev, { sender: "bot", text: response.data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "⚠️ No reply from AI server" },
        ]);
      }
    } catch (error) {
      console.error("Network error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Network/Server error - check backend logs" },
      ]);
    }

    setInput("");
  };

  return (
    <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}>
      {/* Floating Button */}
      {!isOpen && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#007bff",
            borderRadius: 25,
            padding: "8px 12px",
            color: "white",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            animation: "pulse 1.5s infinite",
            fontSize: 14,
            fontWeight: "bold",
          }}
          onClick={() => setIsOpen(true)}
        >
          <span style={{ marginRight: 8 }}>💬</span>
          Chat with AI
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            width: 300,
            height: 400,
            background: "white",
            border: "1px solid #ccc",
            borderRadius: 10,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            marginTop: 10,
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#007bff",
              color: "white",
              padding: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              fontWeight: "bold",
              fontSize: 16,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Ask me a doubt
            <button
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: 16,
                cursor: "pointer",
              }}
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: 10,
              overflowY: "auto",
              fontSize: 14,
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  margin: "5px 0",
                }}
              >
                <b>{msg.sender === "user" ? "You" : "AI"}:</b> {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ display: "flex", borderTop: "1px solid #ccc" }}>
            <input
              style={{
                flex: 1,
                border: "none",
                padding: 8,
                fontSize: 14,
                outline: "none",
              }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              style={{
                background: "#007bff",
                color: "white",
                border: "none",
                padding: "0 12px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* CSS Animation */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}

export default Chatbot;
