const express = require("express");
const router = express.Router();

// 🔹 ทดสอบ backend
router.get("/", (req, res) => {
  res.send("✅ Backend is working!");
});

module.exports = router;
