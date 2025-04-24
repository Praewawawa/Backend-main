// index.js ✅ ใช้ app จาก app.js อย่างถูกต้อง
const app = require("./app");
const dotenv = require("dotenv");
const cron = require("node-cron");
const { deleteExpiredOTPs } = require("./controllers/emailOtpController");
const pool = require("./config/db");

// ✅ โหลด .env ก่อน
dotenv.config();

// ✅ Cron Job: ลบ OTP ที่หมดอายุทุก 5 นาที
cron.schedule("*/5 * * * *", async () => {
  console.log("🧹 ลบ OTP ที่หมดอายุ...");
  await deleteExpiredOTPs();
});

// ✅ เริ่มต้นเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);

  // ✅ ทดสอบการเชื่อมต่อฐานข้อมูล MySQL
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log("✅ DB Connected! Result:", rows[0].result); // Expected: 2
  } catch (error) {
    console.error("❌ DB Connection Error:", error);
  }
});
