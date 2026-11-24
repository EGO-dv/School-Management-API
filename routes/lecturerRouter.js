const express = require("express");
const router = express.Router();

const {
  registerLecturer,
  getAllLecturers,
  getOneLecturer,
} = require("../controllers/lecturerManagementController");

// POST: Register lecturer
router.post("/", registerLecturer);

// GET: Get all lecturers
router.get("/", getAllLecturers);

// GET: Get one lecturer by ID
router.get("/:id", getOneLecturer);

module.exports = router;
