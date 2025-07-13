// server/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/ask", async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-3.5-turbo", // or "gpt-4" if you have access
    });

    res.json({ console.log("GPT response:", completion.choices[0].message.content);
 reply: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log("Using OpenAI key:", process.env.OPENAI_API_KEY);
});
