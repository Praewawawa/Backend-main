const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// 🔹 POST: สมัครสมาชิก
router.post("/register", userController.registerUser);

// 🔹 POST: เข้าสู่ระบบ
router.post("/login", userController.loginUser);

// 🔹 PUT: แก้ไขข้อมูล
router.put("/update/:id", userController.updateUser);

// 🔹 GET: ดึงข้อมูลผู้ใช้ทั้งหมด
router.get("/", userController.getAllUsers);

// 🔹 GET: ดึงข้อมูลผู้ใช้ตาม ID
router.get("/:id", userController.getUserById);

// 🔹 Resetpassword
router.post("/reset-password", userController.resetPassword);


module.exports = router;
