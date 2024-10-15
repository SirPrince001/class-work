const Book = require("../models/book");

//create a new book if it does not exist
exports.createBook = async (req, res) => {
  let { title, author, publicationYear, genre, isbn, copies } = req.body;
  // validate book input
  if (!title || !author || !publicationYear || !genre || !isbn || !copies) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    //check if book exist
    let book = await Book.findOne({ title });
    if (book) {
      return res.status(400).json({ msg: "Book already exists" });
    }

    book = new Book({ title, author, publicationYear, genre, isbn, copies });
    await book.save();
    res.status(201).json({ success: true, response_message: book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, response_message: "Server Error" });
  }
};

//get book by id
exports.getBookById = async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.json({ success: true, response_message: book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, response_message: "Server Error" });
  }
};

// get all books
exports.getAllBooks = async (req, res) => {
  try {
    let books = await Book.find();
    res.json({ success: true, response_message: books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, response_message: "Server Error" });
  }
};
