const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // ✅ เรียกครั้งเดียวพอ
const apiRoutes = require("./routes/api");

dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use("/api", apiRoutes); // ✅ route หลักทั้งหมด

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await connectDB(); // ✅ เชื่อม MySQL ได้ก่อนเริ่มเซิร์ฟเวอร์
    console.log(`✅ Server is running at http://localhost:${PORT}`);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
});
