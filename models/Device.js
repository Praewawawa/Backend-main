const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Device = sequelize.define("Device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  device_name: { type: DataTypes.STRING },
  device_type: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: "devices",
  timestamps: false,
});

module.exports = Device;

