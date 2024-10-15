const router = require("express").Router();
const userAuth = require("../auth/authUser");

// Import controllers
const bookController = require("../controllers/bookController");
router.post("/api/v1/create", userAuth, bookController.createBook);
router.get("/api/v1/book/:id", bookController.getBookById);
router.get("/api/v1/books", bookController.getAllBooks);

module.exports = router;
