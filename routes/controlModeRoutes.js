const express = require("express");
const router = express.Router();
const controlModeController = require("../controllers/controlModeController");

// POST /api/control-mode → ตั้งค่าโหมดควบคุม (Auto / Manual)
router.post("/", controlModeController.setControlMode);

// GET /api/control-mode/:device_id → ดึงโหมดของอุปกรณ์
router.get("/:device_id", controlModeController.getControlMode);


module.exports = router;
