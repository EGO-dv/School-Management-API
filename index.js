const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
require("./database");

const app = express();

app.use(express.json());

// Routes
const studentRoutes = require("./routes/studentRouter");
const courseRouter = require("./routes/courseManagementRouter");
const courseRegRouter = require("./routes/courseRegRouter");
const lecturerRouter = require("./routes/lecturerRouter");
const departmentRouter = require("./routes/departmentRouter");

app.use(studentRoutes);
app.use(courseRouter);
app.use(lecturerRouter);
app.use("/registrations", courseRegRouter);
app.use(departmentRouter);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`My Application is running on port ${PORT}`);
});