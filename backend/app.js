const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const fileUpload = require("express-fileupload");

const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const teacher = require("./routes/teacherRoute");
const staff = require("./routes/staffRoute");
const notice = require("./routes/noticeRoute");
const user = require("./routes/userRoute");

  
app.use("/api/v1", user);
app.use("/api/v1", staff);
app.use("/api/v1", teacher);
app.use("/api/v1", notice);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
