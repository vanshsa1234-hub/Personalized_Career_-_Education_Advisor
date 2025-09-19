import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyAtJFGxza1diJ4CAt_aOCL_TaIpaFCSoag"; // Replace with your actual key

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const prompt = `You are a Career Guidance Instructor for class 10 and class 12 and class 12 passout students. You will only have to reply the questions of students related to JEE, NEET, UPSC, CAT, SSC.
You have to answer both syllabus related questions and other career guidance roadmap for a particular domain.
Suggests colleges, how to start preparation, give them questions to solve if asked and other related things which can help.
If anyone asks irrelevant or out of your domain question, politely say please ask questions related to career guidance or any other related statements.

Student: ${message}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          ],
        }),
      }
    );
    const data = await response.json();
    if (data.candidates && data.candidates[0]?.content?.parts) {
      res.json({ text: data.candidates[0].content.parts[0].text });
    } else if (data.error) {
      console.error("Gemini API error:", data.error); // Log the error for debugging
      res.json({ text: "Sorry, I encountered an error communicating with the AI. Please try again." });
    } else {
      res.json({ text: "Sorry, I couldn't get a clear response. Please try rephrasing." });
    }
  } catch (error) {
    console.error("Fetch error:", error); // Log the error for debugging
    res.json({ text: "An error occurred while fetching the response. Please check your network and try again." });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));