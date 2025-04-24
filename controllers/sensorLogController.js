const db = require("../config/db");

// ✅ ดึงทั้งหมด
exports.getAllLogs = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM sensor_logs");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching logs" });
  }
};

// ✅ เพิ่มใหม่
exports.createLog = async (req, res) => {
  const { device_id, type, value } = req.body;
  try {
    await db.execute(
      "INSERT INTO sensor_logs (device_id, type, value, created_at) VALUES (?, ?, ?, NOW())",
      [device_id, type, value]
    );
    res.status(201).json({ message: "Log created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error inserting log" });
  }
};

// ดึง logs ของอุปกรณ์ id = 1
exports.getLogsByDevice1 = async (req, res) => {
    try {
      const [rows] = await db.query(
        "SELECT * FROM sensor_logs WHERE device_id = 1 ORDER BY created_at DESC"
      );
      res.json(rows);
    } catch (err) {
      console.error("❌ Error fetching logs by device 1:", err);
      res.status(500).json({ message: "Error fetching logs for device 1" });
    }
  };
  
