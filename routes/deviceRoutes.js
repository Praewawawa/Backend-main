// routes/deviceRoutes.js
const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');




// ✅ แก้ให้ตรงกับชื่อฟังก์ชันที่มีใน controller
router.get('/', deviceController.getDevice); // ดึงข้อมูลอุปกรณ์เดียว
router.put('/status', deviceController.updateDeviceStatus); // อัปเดตสถานะ

// เพิ่มที่ด้านล่างสุด
const sensorLogController = require('../controllers/sensorLogController');
router.get('/sensor-logs', sensorLogController.getLogsByDevice1); // เฉพาะ device_id = 1


module.exports = router;
