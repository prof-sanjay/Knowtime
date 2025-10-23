import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Result from "./models/Result.js";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/timeTutor")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// ✅ Save Result
app.post("/api/results", async (req, res) => {
  try {
    const { name, score } = req.body;
    if (!name || score === undefined) {
      return res.status(400).json({ message: "Name and score required" });
    }
    const newResult = new Result({ name, score });
    await newResult.save();
    res.status(201).json({ message: "✅ Result saved" });
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ message: "Error saving result" });
  }
});

// ✅ Fetch Results
app.get("/api/results", async (req, res) => {
  try {
    const results = await Result.find().sort({ date: -1 });
    res.json(results);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Error fetching results" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
