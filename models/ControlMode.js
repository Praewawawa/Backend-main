const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ControlMode = sequelize.define("ControlMode", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  device_id: { type: DataTypes.INTEGER, allowNull: false },
  mode: { type: DataTypes.STRING },
  last_changed: { type: DataTypes.DATE },
}, {
  tableName: "control_modes",
  timestamps: false,
});

module.exports = ControlMode;
