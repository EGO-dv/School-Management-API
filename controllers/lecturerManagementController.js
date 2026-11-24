const mongoose = require("mongoose");
const lecturerModel = require("../model/lecturerManagementModel");

// POST: Register a new lecturer
exports.registerLecturer = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !phoneNumber || !email) {
      return res.status(400).json({
        message: "Please fill in all required fields",
      });
    }

    // Check for existing email or phone number
    const lecturerExists = await lecturerModel.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (lecturerExists) {
      return res.status(409).json({
        message: "Email or phone number already exists",
      });
    }

    // Create lecturer
    const lecturer = await lecturerModel.create({
      firstName,
      lastName,
      phoneNumber,
      email,
    });

    return res.status(201).json({
      message: "Lecturer registered successfully",
      data: lecturer,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email or phone number already exists",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// GET: Retrieve all lecturers
exports.getAllLecturers = async (req, res) => {
  try {
    const lecturers = await lecturerModel.find();

    return res.status(200).json({
      message: "Lecturers fetched successfully",
      count: lecturers.length,
      data: lecturers,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// GET: Retrieve a lecturer by ID
exports.getOneLecturer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid lecturer ID",
      });
    }

    const lecturer = await lecturerModel.findById(id);

    if (!lecturer) {
      return res.status(404).json({
        message: "Lecturer not found",
      });
    }

    return res.status(200).json({
      message: "Lecturer fetched successfully",
      data: lecturer,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
