import express from "express";
import Note from "../models/Note.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create or update note
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { videoId, title, content } = req.body;

    // Check if a note already exists for this user and videoId
    let note = await Note.findOne({ user: req.user.id, videoId });

    if (note) {
      // Update the existing note
      note.title = title;
      note.content = content;
      await note.save();
      return res.status(200).json(note);
    }

    // Otherwise, create a new note
    note = new Note({
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

// Get note for a specific videoId
router.get("/:videoId", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOne({
      user: req.user.id,
      videoId: req.params.videoId,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (err) {
    console.error("Error fetching note:", err);
    res.status(500).json({ error: "Failed to fetch note" });
  }
});

export default router;
