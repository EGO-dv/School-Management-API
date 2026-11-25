const studentModel = require("../model/studentManagementModel");

// Register a new student
exports.registerStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, matricNumber, department } = req.body;

    if (!firstName || !lastName || !email || !matricNumber) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    const emailExists = await studentModel.findOne({ email });
    const matricExists = await studentModel.findOne({ matricNumber });

    if (emailExists || matricExists) {
      return res.status(400).json({ message: "Email or matric number already exists" });
    }

    const student = await studentModel.create({
      firstName,
      lastName,
      email,
      matricNumber,
      department,
    });

    res.status(201).json({
      message: "Student registered successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await studentModel.find().populate("department");

    res.status(200).json({
      message: "Students fetched successfully",
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get a single student
exports.getOneStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await studentModel.findById(id).populate("department");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student fetched successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.updateStudent = async(req, res)=>{
  try {
    const student = req.params.studentId
    const data ={
       email:req.body.email
    };
    const update = await studentModel.findByIdAndUpdate(student,data,{new:true})
    if (!update){
      return res.status(404).json({
        message:"Student not found"
      })
    }
    res.status(200).json({
      message:"student email updated Successfully",
      data:update
    })
  } catch (error) {
     res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.deleteStudent = async(req, res)=>{
try {
  const studentId = req.params.id
  const removedStudent = await studentModel.findByIdAndDelete(studentId)
  res.status(200).json({
    message:"Student removedStudent",
    data: removedStudent
  })
} catch (error) {
  res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
}
}
