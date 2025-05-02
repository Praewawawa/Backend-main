/*const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const SpraySetting = sequelize.define("SpraySetting", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  device_id: { type: DataTypes.INTEGER, allowNull: false },
  is_enabled: { type: DataTypes.BOOLEAN },
  spray_level: { type: DataTypes.STRING },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: "spray_settings",
  timestamps: false,
});

module.exports = SpraySetting;*/

module.exports = (sequelize, DataTypes) => {
  const SpraySetting = sequelize.define("spray_settings", {
    // define attributes
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    device_id: { type: DataTypes.INTEGER, allowNull: false },
    is_enabled: { type: DataTypes.BOOLEAN },
    spray_level: { type: DataTypes.STRING },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    tableName: 'spray_settings',
    timestamps: false,
  });

  return SpraySetting;
};
