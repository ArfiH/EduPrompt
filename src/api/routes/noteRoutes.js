import express from "express";
import Note from "../models/Note.js";
import authMiddleware from "../middleware/authMiddleware.js" // Assuming you have this

const router = express.Router();

// Create new note
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { videoId, title, content } = req.body;

    const note = new Note({
      user: req.user.id,
      videoId,
      title,
      content,
    });

    await note.save();
    res.status(201).json(note);
  } catch (err) {
    console.error("Error saving note:", err);
    res.status(500).json({ error: "Failed to save note" });
  }
});

export default router;
