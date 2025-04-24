const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// 🔹 สร้าง OTP แบบสุ่ม 6 หลัก
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 🔹 ส่ง OTP ทางอีเมล
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
    html: `<h2>รหัส OTP ของคุณคือ:</h2><p style="font-size: 24px; color: green;"><b>${otp}</b></p><br><p>รหัสจะหมดอายุใน 5 นาที</p>`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { generateOTP, sendEmail };
