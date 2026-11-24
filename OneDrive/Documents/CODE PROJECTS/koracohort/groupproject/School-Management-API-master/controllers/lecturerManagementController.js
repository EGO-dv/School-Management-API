const Lecturer = require("../model/lecturerManagementModel");

// POST /lecturers
const createLecturer = async (req, res) => {
  try {
    console.log("Incoming lecturer data:", req.body);

    const lecturer = await Lecturer.create(req.body);

    console.log("Lecturer created successfully:", lecturer);

    res.status(201).json({
      success: true,
      message: "Lecturer created successfully",
      data: lecturer,
    });

  } catch (error) {
    console.error("CREATE LECTURER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /lecturers
const getAllLecturers = async (req, res) => {
  try {
    const lecturers = await Lecturer.find();

    res.status(200).json({
      success: true,
      count: lecturers.length,
      data: lecturers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /lecturers/:id
const getSingleLecturer = async (req, res) => {
  try {
    const lecturer = await Lecturer.findById(req.params.id);

    if (!lecturer) {
      return res.status(404).json({
        success: false,
        message: "Lecturer not found",
      });
    }

    res.status(200).json({
      success: true,
      data: lecturer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createLecturer,
  getAllLecturers,
  getSingleLecturer,
};