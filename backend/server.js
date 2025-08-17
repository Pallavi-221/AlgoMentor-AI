import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

// ----------------------
// Load Environment Variables
// ----------------------
dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  console.error("❌ No API key found in .env");
  process.exit(1);
} else {
  console.log("✅ API key loaded");
}

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ----------------------
// Health Check Route
// ----------------------
app.get("/", (req, res) => {
  res.send("✅ Backend server is running!");
});

// ----------------------
// Chatbot Endpoint
// ----------------------
app.post("/chatbot", async (req, res) => {
  const { message } = req.body;

  console.log("📩 Incoming message:", message);

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "No valid message provided" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an AI that responds with only the core logic in short, clear sentences, without extra explanations unless requested.",
        },
        { role: "user", content: message },
      ],
    });

    const botReply = completion.choices?.[0]?.message?.content?.trim();

    if (!botReply) {
      console.error("⚠️ AI returned no reply:", completion);
      return res.status(500).json({ error: "AI returned an empty response" });
    }

    console.log("🤖 AI Reply:", botReply);
    res.json({ reply: botReply });
  } catch (error) {
    console.error("❌ Error in /chatbot route:", error);

    if (error.response?.status === 401) {
      return res.status(401).json({ error: "Invalid API key. Check your .env file." });
    }

    res
      .status(500)
      .json({ error: error.response?.data?.error?.message || "Failed to get response from AI" });
  }
});

// ----------------------
// Duplicate Route for Frontend (/api/ai)
// ----------------------
app.post("/api/ai", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "No valid message provided" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const botReply = completion.choices?.[0]?.message?.content?.trim();
    res.json({ reply: botReply || "⚠️ AI returned no reply" });
  } catch (error) {
    console.error("❌ Error in /api/ai:", error);
    res.status(500).json({ error: "Failed to get response from AI" });
  }
});

// ----------------------
// Mock Interview Feature
// ----------------------
const interviewQuestions = [
  "Tell me about yourself.",
  "Why should we hire you?",
  "Describe a challenge you faced and how you overcame it.",
  "Where do you see yourself in 5 years?",
];

let userAnswers = [];
let currentQuestionIndex = 0;

app.get("/mock-interview/start", (req, res) => {
  currentQuestionIndex = 0;
  userAnswers = [];
  res.json({ question: interviewQuestions[currentQuestionIndex] });
});

app.post("/mock-interview/answer", async (req, res) => {
  const { answer } = req.body;

  if (!answer || typeof answer !== "string") {
    return res.status(400).json({ error: "Answer is required" });
  }

  userAnswers.push(answer);
  currentQuestionIndex++;

  if (currentQuestionIndex < interviewQuestions.length) {
    res.json({ question: interviewQuestions[currentQuestionIndex] });
  } else {
    try {
      const feedback = await getAIInterviewFeedback(userAnswers);
      res.json({ feedback });
    } catch (error) {
      console.error("❌ Error generating interview feedback:", error);
      res.status(500).json({ error: "Failed to generate interview feedback" });
    }
  }
});

// AI Feedback Function
async function getAIInterviewFeedback(answers) {
  const prompt = `
You are an interview evaluator. Evaluate the following answers and give:
1. Overall score out of 10
2. Strengths
3. Areas for improvement
4. One paragraph summary

Answers:
${answers.map((a, i) => `${i + 1}. ${interviewQuestions[i]} - ${a}`).join("\n")}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices?.[0]?.message?.content?.trim() || "⚠️ AI returned no feedback";
}

// ----------------------
// Server Start
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
