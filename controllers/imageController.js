const db = require('../models');
const Image = db.Image;

exports.uploadImage = async (req, res) => {
  const { name, image_base64 } = req.body;

  if (!name || !image_base64) {
    return res.status(400).json({ message: 'กรุณาใส่ชื่อรูปและข้อมูล base64' });
  }
  if (req.body.avatar_base64) {
    fields.push("avatar_base64=?");
    values.push(req.body.avatar_base64);
  }
  

  try {
    await Image.create({ name, image_base64 });
    res.json({ message: 'อัปโหลดรูปภาพสำเร็จ' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการบันทึกรูปภาพ' });
  }
};
