const express = require("express");
const router = express.Router();
const spraySettingController = require("../controllers/spraySettingController");

// POST /api/spray-setting → บันทึก/อัปเดตค่าการตั้งค่า
router.post("/", spraySettingController.setSpraySetting);

// GET /api/spray-setting/:device_id → ดึงค่าการตั้งค่าจากอุปกรณ์
router.get("/:device_id", spraySettingController.getSpraySetting);

module.exports = router;
