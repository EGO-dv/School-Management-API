const mongoose = require("mongoose");
const departmentModel = require("../model/departmentManagementModel");

// POST:Create a new department
exports.createDepartment = async (req, res) => {
  try {
    const department = await departmentModel.create(req.body);
    res.status(201).json("department is successfully created");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET: Get all departments
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await departmentModel.find();
    if (!departments) {
      return res.status(404).json({
        message: "Deparrment does not exist"
      })
    }

    return res.status(200).json({
      message: "Departments fetched successfully",
      count: departments.length,
      data: departments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// GET: Get a single department by ID
exports.getDepartmentById = async (req, res) => {
  try {
    const id = req.params.id;
    const department = await departmentModel.findById(id);

    if (!department) {
      return res.status(404).json({
        message: "Department not found",
      });
    }
    return res.status(200).json({
      message: "Department fetched successfully",
      data: department,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

// PUT: update a department by ID
exports.updateDepartment = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid department ID",
      });
    }

    const department = await departmentModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    return res.status(200).json({
      message: "Department updated successfully",
      data: department,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE: delete a department by ID
exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid department ID",
      });
    }

    const department = await departmentModel.findByIdAndDelete(id);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    return res.status(200).json({
      message: "Department deleted successfully",
      data: department,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



