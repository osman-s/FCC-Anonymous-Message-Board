const Joi = require("joi");
const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
  },
  imageURL: {
    type: String,
  },
  karma: {
    type: Number,
    default: 1
  },
  datePosted: { 
    type: Date, 
    default: Date.now
  },
});

const Thread = mongoose.model("Thread", threadSchema);

function validateThread(book) {
  const schema = {
    username: Joi.string().alphanum().required(),
    password: Joi.string().required(),
    subject: Joi.string().required(),
    message: Joi.string().allow(""),
    imageURL: Joi.string().allow("").uri(),
  };

  return Joi.validate(book, schema);
}
function validateThreadUpdate(book) {
  const schema = {
    _id: Joi.objectId().required(),
  };

  return Joi.validate(book, schema);
}

exports.threadSchema = threadSchema;
exports.Thread = Thread;
exports.validate = validateThread;
exports.validateThreadUpdate = validateThreadUpdate;
