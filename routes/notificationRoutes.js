const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

// POST /api/notifications → สร้างการแจ้งเตือน
router.post("/", notificationController.createNotification);

// GET /api/notifications/:user_id → ดึงแจ้งเตือนของผู้ใช้
router.get("/:user_id", notificationController.getNotificationsByUser);

// PUT /api/notifications/:id → อัปเดตการแจ้งเตือน (ถ้าต้องการ)
router.put("/:id", notificationController.updateNotification);

// PATCH /api/notifications/read/:id → อัปเดตสถานะเป็นอ่านแล้ว
router.patch("/read/:id", notificationController.markAsRead);

// DELETE /api/notifications/:id → ลบการแจ้งเตือน
router.delete("/:id", notificationController.deleteNotification);

module.exports = router;
