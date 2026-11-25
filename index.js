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

app.use(studentRoutes);
app.use(courseRouter);
app.use("/registrations", courseRegRouter);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`My Application is running on port ${PORT}`);
});