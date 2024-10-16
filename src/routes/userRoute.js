const router = require("express").Router();
const userController = require("../controllers/userController");
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/all-students", userController.getAllStudents);

module.exports = router;
