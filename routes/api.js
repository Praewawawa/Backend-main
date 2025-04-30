// routes/api.js
const express = require("express");
const router = express.Router();

// ✅ import routes ย่อย
const userRoutes = require("./userRoutes");
const deviceRoutes = require("./deviceRoutes");
const spraySettingRoutes = require("./spraySettingRoutes");
const controlModeRoutes = require("./controlModeRoutes");
const sensorLogRoutes = require("./sensorLogRoutes");
const gpsRoutes = require("./gpsRoutes");
const notificationRoutes = require("./notificationRoutes");
const emailOtpRoutes = require("./emailOtpRoutes");

// ✅ mount routes ทั้งหมดภายใต้ /api
router.use("/users", userRoutes);                  // /api/users
router.use("/devices", deviceRoutes);              // /api/devices
router.use("/spray-settings", spraySettingRoutes); // /api/spray-settings
router.use("/control", controlModeRoutes);         // /api/control
router.use("/sensor-logs", sensorLogRoutes);       // /api/sensor-logs
router.use("/gps", gpsRoutes);                     // /api/gps
router.use("/notifications", notificationRoutes);  // /api/notifications
router.use("/otp", emailOtpRoutes);                // /api/otp

module.exports = router;
