const db = require("../config/db"); // ✅ อยู่แค่บรรทัดบนสุด

// ✅ สร้างหรืออัปเดตโหมดควบคุม
exports.setControlMode = (req, res) => {
  const { device_id, mode } = req.body;

  const sql = `
    INSERT INTO control_modes (device_id, mode, last_changed)
    VALUES (?, ?, NOW())
    ON DUPLICATE KEY UPDATE mode = VALUES(mode), last_changed = NOW()
  `;

  db.query(sql, [device_id, mode], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });

    res.status(200).json({ message: "บันทึกโหมดควบคุมแล้ว" });
  });
};

// ✅ ดึงข้อมูลโหมดควบคุมล่าสุด
exports.getControlMode = (req, res) => {
  const { device_id } = req.params;

  const sql = `
    SELECT * FROM control_modes WHERE device_id = ?
  `;

  db.query(sql, [device_id], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });

    if (rows.length === 0) return res.status(404).json({ message: "ไม่พบข้อมูลโหมด" });

    res.status(200).json(rows[0]);
  });
};
