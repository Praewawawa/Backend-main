const EmailOtp = require('../models/EmailOtp');
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// ✅ ฟังก์ชันสร้าง OTP แบบสุ่ม
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ✅ ฟังก์ชันส่งอีเมล
async function sendEmail(to, otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Smart Orchard" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'รหัส OTP สำหรับยืนยันตัวตน',
    html: `
      <h2>รหัส OTP ของคุณคือ:</h2>
      <p style="font-size: 24px; color: green;"><b>${otp}</b></p>
      <br>
      <p>รหัสจะหมดอายุใน 5 นาที</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

// ✅ ฟังก์ชันสร้างและส่ง OTP
exports.createOTP = async (req, res) => {
  const { email, purpose } = req.body;
  if (!email || !purpose) {
    return res.status(400).json({ message: 'Email และ purpose จำเป็นต้องระบุ' });
  }

  const otp = generateOTP();
  const expiredAt = new Date(Date.now() + 5 * 60 * 1000); // 5 นาที

  try {
    const existing = await EmailOtp.findOne({
      where: {
        email,
        purpose
      }
    });

    if (existing) {
      await existing.update({
        otp_code: otp,
        is_verified: false,
        expired_at: expiredAt,
        created_at: new Date()
      });
    } else {
      await EmailOtp.create({
        email,
        otp_code: otp,
        purpose,
        is_verified: false,
        expired_at: expiredAt,
        created_at: new Date()
      });
    }

    await sendEmail(email, otp);
    res.json({ message: 'OTP ถูกส่งไปยังอีเมลเรียบร้อยแล้ว' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการส่ง OTP' });
  }
};

// ✅ ฟังก์ชันยืนยัน OTP
exports.verifyOTP = async (req, res) => {
  const { email, otp_code, purpose } = req.body;

  if (!email || !otp_code || !purpose) {
    return res.status(400).json({ message: 'ข้อมูลไม่ครบ' });
  }

  try {
    const otpEntry = await EmailOtp.findOne({
      where: {
        email,
        otp_code,
        purpose,
        is_verified: false,
        expired_at: { [Op.gt]: new Date() }
      },
      order: [['created_at', 'DESC']]
    });

    if (!otpEntry) {
      return res.status(400).json({ message: 'OTP ไม่ถูกต้องหรือหมดอายุ' });
    }

    await otpEntry.update({ is_verified: true });
    res.status(200).json({ message: 'ยืนยัน OTP สำเร็จ' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการยืนยัน OTP' });
  }
};

// ✅ ฟังก์ชันลบ OTP ที่หมดอายุ
exports.deleteExpiredOTPs = async () => {
  try {
    const result = await EmailOtp.destroy({
      where: {
        expired_at: { [Op.lt]: new Date() }
      }
    });
    console.log(`🧹 ลบ OTP หมดอายุแล้ว ${result} รายการ`);
  } catch (error) {
    console.error('❌ ลบ OTP หมดอายุไม่สำเร็จ:', error);
  }
};
