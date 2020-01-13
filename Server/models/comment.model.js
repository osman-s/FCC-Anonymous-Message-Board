const Joi = require("joi");
const mongoose = require("mongoose");
const { bookSchema } = require("./book.model");

const CommentSchema = new mongoose.Schema({
  book: {
    type: bookSchema,
    required: true
  },
  comment: {
    type: String,
    required: true,
  }
});

const Comment = mongoose.model("Comment", CommentSchema);

function validateComment(comment) {
  const schema = {
    bookId: Joi.objectId().required(),
    comment: Joi.string().required()
  };

  return Joi.validate(comment, schema);
}

exports.Comment = Comment;
exports.validateComment = validateComment;
