const express = require("express");
const router = express.Router();

const {
  registerLecturer,
  getAllLecturers,
  getOneLecturer,
  updateLecturer,
  deleteLecturer,
} = require("../controllers/lecturerManagementController");

// POST: Register lecturer
router.post("/lecturer", registerLecturer);

// GET: Get all lecturers
router.get("/lecturer", getAllLecturers);

// GET: Get one lecturer by ID
router.get("/lecturer/:id", getOneLecturer);

// PUT: update a lecturer by ID
router.put("/lecturer/:id", updateLecturer);

// DELETE: delete a lecturer by ID
router.delete("/lecturer/:id", deleteLecturer);

module.exports = router;
