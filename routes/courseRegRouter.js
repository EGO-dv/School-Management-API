
const express = require("express");
const router = express.Router();

const {
  registerCourse,
  getAllRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
} = require("../controllers/courseRegistrationController");

// POST /registrations
router.post("/", registerCourse);

// GET /registrations
router.get("/", getAllRegistrations);

// GET /registrations/:id
router.get("/:id", getRegistrationById);

// PUT /registrations/:id
router.put("/:id", updateRegistration);

// DELETE /registrations/:id
router.delete("/:id", deleteRegistration);

module.exports = router;