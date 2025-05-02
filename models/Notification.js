/*const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Notification = sequelize.define("Notification", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING },
  subtitle: { type: DataTypes.TEXT },
  icon: { type: DataTypes.STRING },
  is_read: { type: DataTypes.BOOLEAN },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: "notifications",
  timestamps: false,
});

module.exports = Notification;*/

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define("notifications", {
    // define attributes
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING },
    subtitle: { type: DataTypes.TEXT },
    icon: { type: DataTypes.STRING },
    is_read: { type: DataTypes.BOOLEAN },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    tableName: 'notifications',
    timestamps: false,
  });

  return Notification;
};
