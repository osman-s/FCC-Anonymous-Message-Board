const Joi = require("joi");
const mongoose = require("mongoose");
const { threadSchema } = require("./thread.model");

const CommentSchema = new mongoose.Schema({
  thread: {
    type: threadSchema,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true,
  },
  karma: {
    type: Number,
    default: 1
  },
  datePosted: { 
    type: Date, 
    default: Date.now
  }
});

const Comment = mongoose.model("Comment", CommentSchema);

function validateComment(comment) {
  const schema = {
    threadId: Joi.objectId().required(),
    username: Joi.string().alphanum().required(),
    comment: Joi.string().required()
  };

  return Joi.validate(comment, schema);
}

exports.Comment = Comment;
exports.validateComment = validateComment;
