const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const GpsLocation = sequelize.define("GpsLocation", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  device_id: { type: DataTypes.INTEGER, allowNull: false },
  lat: { type: DataTypes.DOUBLE },
  lng: { type: DataTypes.DOUBLE },
  timestamp: { type: DataTypes.DATE },
}, {
  tableName: "gps_locations",
  timestamps: false,
});

module.exports = GpsLocation;
