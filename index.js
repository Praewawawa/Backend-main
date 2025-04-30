// index.js

const app = require("./app");
const dotenv = require("dotenv");
const cron = require("node-cron");
const os = require("os");
const { deleteExpiredOTPs } = require("./controllers/emailOtpController");
const pool = require("./config/db");

// ✅ โหลด .env ก่อนทำอย่างอื่น
dotenv.config();

// ✅ ดึง PORT และ HOST
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0"; // ✅ เปิดให้เครื่องอื่นใน LAN เข้าถึงได้

// ✅ หาฟังก์ชันดึง IP เครื่องในวง LAN
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
  console.log("🧹 กำลังลบ OTP ที่หมดอายุ...");
  await deleteExpiredOTPs();
});

// ✅ เริ่มต้นเซิร์ฟเวอร์
async function startServer() {
  try {
    // ทดสอบเชื่อมต่อฐานข้อมูลก่อน
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log("✅ Database Connected! Result:", rows[0].result); // Expected 2

    // ถ้าเชื่อมต่อฐานข้อมูลสำเร็จ ค่อยเริ่มฟัง
    app.listen(PORT, HOST, () => {
      const localIP = getLocalIP();
      console.log(`✅ Server is running at:`);
      console.log(`   ➜ Local:   http://localhost:${PORT}`);
      console.log(`   ➜ Network: http://${localIP}:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
    process.exit(1); // ❌ ถ้าเชื่อมไม่ได้ ปิด server ทันที
  }
}

// 🔥 เรียก startServer ตอนเริ่มต้น
startServer();