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

exports.addDevice = async (req, res) => {
  try {
    const { device_name, device_type, status } = req.body;

    const [result] = await db.query(
      "INSERT INTO devices (device_name, device_type, status, created_at) VALUES (?, ?, ?, NOW())",
      [device_name, device_type, status]
    );

    res.status(201).json({ message: "เพิ่มอุปกรณ์สำเร็จ", deviceId: result.insertId });
  } catch (err) {
    console.error("❌ Error adding device:", err);
    res.status(500).json({ message: "Error adding device" });
  }
};
