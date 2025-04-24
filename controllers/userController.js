/*const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ ฟังก์ชันสมัครสมาชิก
async function registerUser(req, res) {
  const { fullname, email, password, gender, phone } = req.body;

  try {
    // ตรวจสอบว่ามี email นี้แล้วหรือยัง
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email นี้มีอยู่ในระบบแล้ว" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      gender,
      phone,
    });

    await newUser.save();

    res.status(201).json({ message: "สมัครสมาชิกสำเร็จ" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
  }
}

// ✅ ฟังก์ชันเข้าสู่ระบบ
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "ไม่พบบัญชีผู้ใช้" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "รหัสผ่านไม่ถูกต้อง" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "เข้าสู่ระบบสำเร็จ",
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        gender: user.gender,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
  }
}

// ✅ ฟังก์ชันแก้ไขข้อมูลผู้ใช้
async function updateUser(req, res) {
  const { id } = req.params;
  const { fullname, email, password, gender, phone } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "ไม่พบบัญชีผู้ใช้" });

    user.fullname = fullname || user.fullname;
    user.email = email || user.email;
    user.gender = gender || user.gender;
    user.phone = phone || user.phone;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();
    res.json({ message: "อัปเดตข้อมูลสำเร็จ", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
  }
}

module.exports = { registerUser, loginUser, updateUser };*/
const pool = require("../config/db");
const bcrypt = require("bcryptjs");


// ✅ ลงทะเบียนผู้ใช้ใหม่
exports.registerUser = async (req, res) => {
  const { fullname, email, phone, password, gender } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [existing] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "อีเมลนี้มีอยู่แล้วในระบบ" });
    }

    const [result] = await pool.execute(
      "INSERT INTO users (name, email, phone, password, gender, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
      [fullname, email, phone, hashedPassword, gender]
    );

    res.status(201).json({ message: "ลงทะเบียนสำเร็จ", userId: result.insertId });
  } catch (error) {
    console.error("❌ REGISTER ERROR:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการลงทะเบียน" });
  }
};


// ✅ เข้าสู่ระบบ
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0];
    if (!user) return res.status(404).json({ message: "ไม่พบผู้ใช้นี้" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "รหัสผ่านไม่ถูกต้อง" });

    res.status(200).json({
      message: "เข้าสู่ระบบสำเร็จ",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" });
  }
};

// ✅ แก้ไขข้อมูลผู้ใช้

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, gender, password } = req.body;

  try {
    const fields = [];
    const values = [];

    if (name) {
      fields.push("name=?");
      values.push(name);
    }
    if (email) {
      fields.push("email=?");
      values.push(email);
    }
    if (phone) {
      fields.push("phone=?");
      values.push(phone);
    }
    if (gender) {
      fields.push("gender=?");
      values.push(gender);
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      fields.push("password=?");
      values.push(hashedPassword);
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: "กรุณาระบุข้อมูลที่ต้องการอัปเดต" });
    }

    const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    await pool.execute(sql, values);
    res.status(200).json({ message: "อัปเดตข้อมูลสำเร็จ" });

  } catch (error) {
    console.error("❌ UPDATE ERROR:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" });
  }
};
