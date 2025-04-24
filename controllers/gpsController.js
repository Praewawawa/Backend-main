const db = require("../config/db");

// เพิ่มตำแหน่ง GPS
exports.createGPSLocation = (req, res) => {
  const { device_id, lat, lng, timestamp } = req.body;

  const sql = `
    INSERT INTO gps_locations (device_id, lat, lng, timestamp)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [device_id, lat, lng, timestamp], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });

    res.status(201).json({ message: "ตำแหน่งถูกบันทึกแล้ว", id: result.insertId });
  });
};

// ดึงตำแหน่งทั้งหมดของอุปกรณ์เดียว
exports.getGPSByDevice = (req, res) => {
  const { device_id } = req.params;

  const sql = `SELECT * FROM gps_locations WHERE device_id = ? ORDER BY timestamp DESC`;

  db.query(sql, [device_id], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });

    res.status(200).json(rows);
  });
};

// ดึงตำแหน่งล่าสุด
exports.getLatestGPS = (req, res) => {
  const sql = `SELECT * FROM gps_locations ORDER BY timestamp DESC LIMIT 1`;

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });

    res.status(200).json(rows[0]);
  });
};
