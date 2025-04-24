import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authMiddleware from "../middleware/authMiddleware.js";

dotenv.config();
const router = express.Router();

// POST /api/watch
router.post("/", authMiddleware, async (req, res) => {
  const { videoId, title } = req.body;
  console.log("Hit Watch route");
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const alreadyWatched = user.watchHistory.some((v) => v.videoId === videoId);
    console.log({ videoId, title });

    if (!alreadyWatched) {
      user.watchHistory.push({ videoId, title });
      await user.save();
    }

    res.status(200).json({ message: "Watch history updated" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update watch history", details: err.message });
  }
});

export default router;
