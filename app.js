const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

// Routes
const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");

// Helpers
const apiResponse = require("./helpers/apiResponse");

// สร้างแอป
const app = express();

// Middleware
if (process.env.NODE_ENV !== "test") {
  app.use(logger("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// ✅ ใช้งานเส้นทางหลัก
app.use("/", indexRouter);
app.use("/api", apiRouter); // ✅ สำคัญที่สุด

// ✅ จัดการเส้นทางที่ไม่พบ
app.all("*", function(req, res) {
  return apiResponse.notFoundResponse(res, "Page not found");
});

// ✅ จัดการ Error
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return apiResponse.unauthorizedResponse(res, err.message);
  }
  return apiResponse.ErrorResponse(res, err.message);
});

module.exports = app;