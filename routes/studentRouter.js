const { getAllStudents, registerStudent, getOneStudent, updateStudent, deleteStudent } = require("../controllers/studentManagementController")

const router = require("express").Router()


router.post("/student",registerStudent)
router.get("/student",getAllStudents)
router.get("/student/:id",getOneStudent)
router.patch("/student/:studentId",updateStudent)
router.delete("/student/:id",deleteStudent)


module.exports =router;