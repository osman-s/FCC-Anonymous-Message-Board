const mongoose = require("mongoose");
const { Thread, validate } = require("../models/thread.model");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const thread = await Thread.find()
    .select("-__v")
    .sort("subject");
  res.send(thread);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const posts = req.body;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

//   let post = await Book.findOne({ title: posts.title });
//   if (post) return res.status(400).send("Book already posted.");

  post = new Thread({
    username: posts.username,
    password: posts.password,
    subject: posts.subject,
    message: posts.message,
    imageURL: posts.imageURL,

  });
  await post.save();
  // user = _.pick(user, ["name", "_id"]);
  res.send(post);
});

router.delete("/", async (req, res) => {
  console.log(req.body);
  posts = req.body;
  const post = await Book.findByIdAndRemove(posts._id);

  if (!post)
    return res.status(404).send("The book with the given ID was not found.");
  res.send(post);
});

// router.get("/:id", validateObjectId, async (req, res) => {
//   const post = await Post.findById(req.params.id).select("-__v");

//   if (!post)
//     return res.status(404).send("The movie with the given ID was not found.");

//   res.send(movie);
// });

module.exports = router;
