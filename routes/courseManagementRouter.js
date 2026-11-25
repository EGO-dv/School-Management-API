const router = require("express").Router();

const {
  createCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseManagementController");

router.post("/courses", createCourse);

router.get("/courses", getAllCourses);

router.put("/courses/:id", updateCourse);

router.delete("/courses/:id", deleteCourse);

module.exports = router;