module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_base64: {
        type: DataTypes.TEXT('long'), // LONGTEXT
        allowNull: false,
      },
    }, {
      tableName: 'images',
      timestamps: true,
    });
  
    return Image;
  };
  