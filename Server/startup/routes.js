const express = require("express");
const books = require("../routes/book");
const comments = require("../routes/comments");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(express.static("public"));
  app.use(express.json());
  app.use("/", books);
  app.use("/comments", comments);

  app.use(error);
};
