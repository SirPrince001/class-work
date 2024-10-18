const router = require("express").Router();
const userController = require("../controllers/userController");
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/all-students", userController.getAllStudents);
router.put("/edit-student/:id", userController.updateStudentById);
router.delete("/student/:id", userController.deleteStudentById);

module.exports = router;
