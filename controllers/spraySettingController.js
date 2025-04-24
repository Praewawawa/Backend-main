const db = require("../config/db");

// ✅ บันทึกหรืออัปเดตการตั้งค่าการฉีดพ่น
exports.setSpraySetting = (req, res) => {
  const { device_id, is_enabled, spray_level } = req.body;

  const sql = `
    INSERT INTO spray_settings (device_id, is_enabled, spray_level, updated_at)
    VALUES (?, ?, ?, NOW())
    ON DUPLICATE KEY UPDATE 
      is_enabled = VALUES(is_enabled),
      spray_level = VALUES(spray_level),
      updated_at = NOW()
  `;

  db.query(sql, [device_id, is_enabled, spray_level], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });

    res.status(200).json({ message: "อัปเดตการตั้งค่าการฉีดพ่นเรียบร้อยแล้ว" });
  });
};

// ✅ ดึงค่าการตั้งค่าปัจจุบัน
exports.getSpraySetting = (req, res) => {
  const { device_id } = req.params;

  const sql = `
    SELECT * FROM spray_settings WHERE device_id = ?
  `;

  db.query(sql, [device_id], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });

    if (rows.length === 0) return res.status(404).json({ message: "ไม่พบการตั้งค่า" });

    res.status(200).json(rows[0]);
  });
};
