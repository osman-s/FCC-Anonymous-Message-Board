const express = require("express");
const threads = require("../routes/threads");
const comments = require("../routes/comments");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(express.static("public"));
  app.use(express.json());
  app.use("/", threads);
  app.use("/comments", comments);

  app.use(error);
};
