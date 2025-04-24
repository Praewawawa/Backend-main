const express = require("express");
const router = express.Router();
const sensorLogController = require("../controllers/sensorLogController");

// ✅ ดึง sensor log ทั้งหมด
router.get("/", sensorLogController.getAllLogs);

// ✅ เพิ่ม sensor log ใหม่
router.post("/", sensorLogController.createLog);

module.exports = router;
