const db = require("../config/db");

// ✅ สร้างการแจ้งเตือนใหม่
exports.createNotification = (req, res) => {
  const { user_id, title, subtitle, icon } = req.body;

  const sql = `
    INSERT INTO notifications (user_id, title, subtitle, icon, is_read, created_at)
    VALUES (?, ?, ?, ?, false, NOW())
  `;

  db.query(sql, [user_id, title, subtitle, icon], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });

    res.status(201).json({ message: "เพิ่มการแจ้งเตือนเรียบร้อยแล้ว" });
  });
};

// ✅ ดึงการแจ้งเตือนทั้งหมดของผู้ใช้
exports.getNotificationsByUser = (req, res) => {
  const { user_id } = req.params;

  const sql = `
    SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC
  `;

  db.query(sql, [user_id], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });

    res.status(200).json(rows);
  });
};

// ✅ ดึงการแจ้งเตือนที่ยังไม่ได้อ่าน
exports.getUnreadNotifications = (req, res) => {
  const { user_id } = req.params;

  const sql = `
    SELECT * FROM notifications WHERE user_id = ? AND is_read = false ORDER BY created_at DESC
  `;

  db.query(sql, [user_id], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });

    res.status(200).json(rows);
  });
};

// ✅ อัปเดตสถานะการอ่าน
exports.markAsRead = (req, res) => {
  const { id } = req.params;

  const sql = `
    UPDATE notifications SET is_read = true WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });

    res.status(200).json({ message: "เปลี่ยนสถานะเป็นอ่านแล้ว" });
  });
};

// ✅ อัปเดตการแจ้งเตือน
exports.updateNotification = (req, res) => {
  const { id } = req.params;
  const { title, subtitle, icon } = req.body;

  const sql = `
    UPDATE notifications SET title = ?, subtitle = ?, icon = ? WHERE id = ?
  `;

  db.query(sql, [title, subtitle, icon, id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });

    res.status(200).json({ message: "อัปเดตการแจ้งเตือนเรียบร้อยแล้ว" });
  });
};

// ✅ ลบการแจ้งเตือน
exports.deleteNotification = (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM notifications WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });

    res.status(200).json({ message: "ลบการแจ้งเตือนแล้ว" });
  });
};

// ✅ ดึงการตั้งค่าของผู้ใช้
exports.getNotificationSettings = (req, res) => {
  const { user_id } = req.params;
  const sql = `SELECT * FROM notification_settings WHERE user_id = ?`;
  db.query(sql, [user_id], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    res.status(200).json(rows[0] || {});
  });
};

// ✅ อัปเดตหรือลงข้อมูลใหม่
exports.updateNotificationSettings = (req, res) => {
  const { user_id } = req.params;
  const { speed_alert, battery_alert, chemical_alert, route_alert } = req.body;

  const sql = `
    INSERT INTO notification_settings (user_id, speed_alert, battery_alert, chemical_alert, route_alert)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      speed_alert = VALUES(speed_alert),
      battery_alert = VALUES(battery_alert),
      chemical_alert = VALUES(chemical_alert),
      route_alert = VALUES(route_alert)
  `;

  db.query(sql, [user_id, speed_alert, battery_alert, chemical_alert, route_alert], (err) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    res.status(200).json({ message: "อัปเดตการตั้งค่าเรียบร้อยแล้ว" });
  });
};
