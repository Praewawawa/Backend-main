const express = require("express");
const router = express.Router();
const gpsController = require("../controllers/gpsController");

// POST /api/gps → เพิ่มตำแหน่ง GPS
router.post("/", gpsController.createGPSLocation);

// GET /api/gps/device/:device_id → ดูตำแหน่งของอุปกรณ์
router.get("/device/:device_id", gpsController.getGPSByDevice);

// GET /api/gps/latest → ดูตำแหน่งล่าสุด
router.get("/latest", gpsController.getLatestGPS);

module.exports = router;
