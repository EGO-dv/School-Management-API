const router = require("express").Router()

const {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentManagementController");

router.post("/department", createDepartment);
router.get("/departments", getAllDepartments);
router.get("/department/:id", getDepartmentById);
router.put("/department/:id", updateDepartment);
router.delete("/department/:id", deleteDepartment);

module.exports = router;
