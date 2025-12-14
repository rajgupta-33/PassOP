import express from "express";
import Password from "../models/Password.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get passwords of logged-in user only
router.get("/", auth, async (req, res) => {
  try {
    const passwords = await Password.find({ userId: req.user.id });
    res.json(passwords);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add new password for logged-in user
router.post("/", auth, async (req, res) => {
  try {
    const newPassword = new Password({
      userId: req.user.id,
      site: req.body.site,
      username: req.body.username,
      password: req.body.password,
    });
    await newPassword.save();
    res.json(newPassword);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete password (only if owned by user)
router.delete("/", auth, async (req, res) => {
  try {
    const { id } = req.body;
    const pass = await Password.findOne({ _id: id, userId: req.user.id });
    if (!pass) return res.status(404).json({ error: "Password not found" });
    await pass.remove();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
