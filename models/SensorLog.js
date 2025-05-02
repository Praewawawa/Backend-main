/*const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const SensorLog = sequelize.define("SensorLog", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  device_id: { type: DataTypes.INTEGER, allowNull: false },
  type: { type: DataTypes.STRING },
  value: { type: DataTypes.STRING },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: "sensor_logs",
  timestamps: false,
});*/

module.exports = (sequelize, DataTypes) => {
  const SensorLog = sequelize.define("sensor_logs", {
    // define attributes
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING },
    subtitle: { type: DataTypes.TEXT },
    icon: { type: DataTypes.STRING },
    is_read: { type: DataTypes.BOOLEAN },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    tableName: 'sensor_logs',
    timestamps: false,
  });

  return SensorLog;
};

const db = require("../config/db");

// ✅ เพิ่ม sensor log
exports.createSensorLog = (req, res) => {
  const { device_id, type, value } = req.body;

  const sql = `
    INSERT INTO sensor_logs (device_id, type, value, created_at)
    VALUES (?, ?, ?, NOW())
  `;

  db.query(sql, [device_id, type, value], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });

    res.status(201).json({ message: "เพิ่ม log เรียบร้อยแล้ว" });
  });
};

// ✅ ดึง sensor log ตาม device_id
exports.getSensorLogsByDevice = (req, res) => {
  const { device_id } = req.params;

  const sql = `
    SELECT * FROM sensor_logs WHERE device_id = ? ORDER BY created_at DESC
  `;

  db.query(sql, [device_id], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });

    res.status(200).json(rows);
  });
};

// ✅ ลบ sensor log รายการเดียว
exports.deleteSensorLog = (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM sensor_logs WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });

    res.status(200).json({ message: "ลบ log แล้ว" });
  });
};




