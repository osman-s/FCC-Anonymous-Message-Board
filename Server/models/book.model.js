const Joi = require("joi");
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
});

const Book = mongoose.model("Book", bookSchema);

function validateBook(book) {
  const schema = {
    title: Joi.string().required()
  };

  return Joi.validate(book, schema);
}

exports.bookSchema = bookSchema;
exports.Book = Book;
exports.validateBook = validateBook;
