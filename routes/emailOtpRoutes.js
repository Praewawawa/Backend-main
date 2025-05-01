const express = require('express');
const router = express.Router();
const emailOtpController = require('../controllers/emailOtpController');

// 🔹 POST: สร้างและส่ง OTP
router.post('/create-otp', emailOtpController.createOTP);

// 🔹 POST: ยืนยัน OTP
router.post('/verify-otp', emailOtpController.verifyOTP);

// 🔹 DELETE: ลบ OTP ที่หมดอายุ (เรียกจาก cron job หรือ manual ก็ได้)
router.delete('/cleanup-otps', async (req, res) => {
  await emailOtpController.deleteExpiredOTPs();
  res.status(200).json({ message: 'ลบ OTP หมดอายุแล้ว' });
});

module.exports = router;