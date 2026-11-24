
const mongoose = require("mongoose");
const CourseRegistration = require("../model/courseRegistrationModel");

// POST: Register a student for a course
const registerCourse = async (req, res) => {
  try {
    const { student, course, academicSession, semester } = req.body;

    if (!student || !course || !academicSession || !semester) {
      return res.status(400).json({
        message: "Please provide all required registration details",
      });
    }

    if (
      !mongoose.isValidObjectId(student) ||
      !mongoose.isValidObjectId(course)
    ) {
      return res.status(400).json({
        message: "Invalid student or course ID",
      });
    }

    const registration = await CourseRegistration.create({
      student,
      course,
      academicSession,
      semester,
    });

    res.status(201).json({
      message: "Course registered successfully",
      data: registration,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "This student is already registered for this course in this semester",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET: Get all course registrations
const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await CourseRegistration.find()
      .populate("student")
      .populate("course");

    res.status(200).json({
      message: "All course registrations retrieved successfully",
      data: registrations,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET: Get a single registration
const getRegistrationById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid registration ID",
      });
    }

    const registration = await CourseRegistration.findById(id)
      .populate("student")
      .populate("course");

    if (!registration) {
      return res.status(404).json({
        message: "Course registration not found",
      });
    }

    res.status(200).json({
      message: "Course registration retrieved successfully",
      data: registration,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// PUT: Update a course registration
const updateRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid registration ID",
      });
    }

    const allowedFields = [
      "student",
      "course",
      "academicSession",
      "semester",
      "status",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "Please provide at least one field to update",
      });
    }

    if (
      (updates.student && !mongoose.isValidObjectId(updates.student)) ||
      (updates.course && !mongoose.isValidObjectId(updates.course))
    ) {
      return res.status(400).json({
        message: "Invalid student or course ID",
      });
    }

    const registration = await CourseRegistration.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("student")
      .populate("course");

    if (!registration) {
      return res.status(404).json({
        message: "Course registration not found",
      });
    }

    res.status(200).json({
      message: "Course registration updated successfully",
      data: registration,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "This registration already exists",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE: Delete a course registration
const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid registration ID",
      });
    }

    const registration = await CourseRegistration.findByIdAndDelete(id);

    if (!registration) {
      return res.status(404).json({
        message: "Course registration not found",
      });
    }

    res.status(200).json({
      message: "Course registration deleted successfully",
      data: registration,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerCourse,
  getAllRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
};