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

// ✅ ดึงข้อมูลผู้ใช้ทั้งหมด
exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.execute("SELECT id, name, email, phone, gender, created_at FROM users");
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ GET ALL USERS ERROR:", error);
    res.status(500).json({ message: "ไม่สามารถดึงข้อมูลผู้ใช้ได้" });
  }
};

// ✅ ดึงข้อมูลผู้ใช้ตาม ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute("SELECT id, name, email, phone, gender, created_at FROM users WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "ไม่พบผู้ใช้นี้" });

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("❌ GET USER BY ID ERROR:", error);
    res.status(500).json({ message: "ไม่สามารถดึงข้อมูลผู้ใช้ได้" });
  }
};
