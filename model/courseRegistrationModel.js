
const mongoose = require("mongoose");

const courseRegistrationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    academicSession: {
      type: String,
      required: true,
      trim: true,
    },

    semester: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Registered", "Approved", "Cancelled"],
      default: "Registered",
    },

    registrationDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate registration for the same course
// in the same academic session and semester.
courseRegistrationSchema.index(
  {
    student: 1,
    course: 1,
    academicSession: 1,
    semester: 1,
  },
  { unique: true }
);

const CourseRegistration = mongoose.model(
  "CourseRegistration",
  courseRegistrationSchema
);

module.exports = CourseRegistration;