const db = require("../config/db");


// ดึงข้อมูลอุปกรณ์เพียงเครื่องเดียว
exports.getDevice = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM devices LIMIT 1");
    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Error fetching device:", err);
    res.status(500).json({ message: "Error fetching device" });
  }
};

// แก้ไขสถานะของอุปกรณ์ (Online / Offline)
exports.updateDeviceStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await db.query("UPDATE devices SET status = ? WHERE id = 1", [status]);
    res.json({ message: "Device status updated successfully" });
  } catch (err) {
    console.error("❌ Error updating device:", err);
    res.status(500).json({ message: "Error updating device" });
  }
};
