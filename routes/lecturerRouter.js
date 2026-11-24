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
router.post("/", registerLecturer);

// GET: Get all lecturers
router.get("/", getAllLecturers);

// GET: Get one lecturer by ID
router.get("/:id", getOneLecturer);

// PUT: update a lecturer by ID
router.put("/:id", updateLecturer);

// DELETE: delete a lecturer by ID
router.delete("/:id", deleteLecturer);

module.exports = router;
