const courseModel = require("../model/courseManagementModel");

// CREATE COURSE
exports.createCourse = async (req, res) => {
  try {
    const { courseCode, courseTitle, courseUnit } = req.body;

    if (!courseCode || !courseTitle || !courseUnit) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const course = await courseModel.create({
      courseCode,
      courseTitle,
      courseUnit,
    });

    res.status(201).json({
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// GET ALL COURSES
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.find();

    res.status(200).json({
      message: "Courses fetched successfully",
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// UPDATE COURSE
exports.updateCourse = async (req, res) => {
  try {
    const updatedCourse = await courseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// DELETE COURSE
exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await courseModel.findByIdAndDelete(
      req.params.id
    );

    if (!deletedCourse) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Course deleted successfully",
      data: deletedCourse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};