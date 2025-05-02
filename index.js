// index.js
const app = require("./app");
const dotenv = require("dotenv");
const cron = require("node-cron");
const os = require("os");
const { deleteExpiredOTPs } = require("./controllers/emailOtpController");
const pool = require("./config/db");
const db = require("./models"); // ✅ ดึง Sequelize models ที่โหลดไว้ใน models/index.js

// ✅ โหลด .env ก่อนทำอย่างอื่น
dotenv.config();

// ✅ ดึง PORT และ HOST
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0"; // ✅ เปิดให้เครื่องอื่นใน LAN เข้าถึงได้

// ✅ หา IP ในวง LAN เพื่อแสดงตอนรัน
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}

// ✅ ตั้งเวลา Cron Job ลบ OTP ทุก 5 นาที
cron.schedule("*/5 * * * *", async () => {
  console.log("🧹 ลบ OTP ที่หมดอายุ...");
  await deleteExpiredOTPs();
});

// ✅ เริ่มเซิร์ฟเวอร์
async function startServer() {
  try {
    // ทดสอบเชื่อมต่อฐานข้อมูลก่อน
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log("✅ Database Connected! Result:", rows[0].result); // Expected 2

    // เชื่อมต่อ Sequelize
    await db.sequelize.authenticate();
    console.log("✅ Sequelize connected successfully.");

    app.listen(PORT, HOST, () => {
      const localIP = getLocalIP();
      console.log(`✅ Server is running at:`);
      console.log(`   ➜ Local:   http://localhost:${PORT}`);
      console.log(`   ➜ Network: http://${localIP}:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
    process.exit(1);
  }
}

// 🔥 เรียก startServer
startServer();
