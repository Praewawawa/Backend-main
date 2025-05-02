# ใช้ Node.js base image
FROM node:18

# สร้าง working directory
WORKDIR /app

# คัดลอกไฟล์ package.json และติดตั้ง dependencies
COPY package*.json ./
RUN npm install

# คัดลอก source code ทั้งหมด
COPY . .

# เปิด port ที่ใช้งาน
EXPOSE 3000

# รันแอป
CMD ["node", "index.js"]
