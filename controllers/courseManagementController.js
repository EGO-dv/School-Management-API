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
      error: error.message,
    });
  }
};

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
      error: error.message,
    });
  }
};