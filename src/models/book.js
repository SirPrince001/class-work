const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publicationYear: { type: Date, required: true },
  genre: { type: String, required: true },
  isbn: { type: String, required: true },
  copies: { type: Number, required: true, default: 0 },
}, {timestamps:true});


module.exports = mongoose.model("Book", bookSchema);