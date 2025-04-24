// models/EmailOtp.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize"); // ต้อง export ตัว instance

const EmailOtp = sequelize.define("email_otps", {
  email: { type: DataTypes.STRING, allowNull: false },
  otp_code: { type: DataTypes.STRING, allowNull: false },
  purpose: { type: DataTypes.STRING, allowNull: false },
  is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  expired_at: { type: DataTypes.DATE },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  timestamps: false,
});

module.exports = EmailOtp;
