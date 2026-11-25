const router = require("express").Router();

const {
  updateCourse,
  deleteCourse,
} = require("../controllers/courseManagementController");

router.put("/courses/:id", updateCourse);

router.delete("/courses/:id", deleteCourse);

module.exports = router;