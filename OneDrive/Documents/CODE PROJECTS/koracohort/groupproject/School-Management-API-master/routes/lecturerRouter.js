const express = require("express");

const router = express.Router();

const {
  createLecturer,
  getAllLecturers,
  getSingleLecturer,
} = require("../controllers/lecturerManagementController");

router.post("/", createLecturer);

router.get("/", getAllLecturers);

router.get("/:id", getSingleLecturer);

module.exports = router;