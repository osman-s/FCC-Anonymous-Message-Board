const mongoose = require("mongoose");
const { Book } = require("../models/book.model");
const { Comment, validateComment } = require("../models/comment.model");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const comment = await Comment.find()
    .select("-__v")
    // .sort("bookId");
  res.send(comment);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const posts = req.body;
  const { error } = validateComment(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let book = await Book.findById(posts.bookId);
  if (!book) return res.status(400).send("Invalid BookId.");

  post = new Comment({
    book: {
      _id: book._id,
      title: book.title
    },
    comment: posts.comment
  });
  await post.save();
  // user = _.pick(user, ["name", "_id"]);
  res.send(post);
});

router.delete("/", async (req, res) => {
  console.log(req.body);
  posts = req.body;
  const post = await Comment.findByIdAndRemove(posts._id);

  if (!post)
    return res.status(404).send("The comment with the given ID was not found.");
  res.send(post);
});

// router.get("/:id", validateObjectId, async (req, res) => {
//   const post = await Post.findById(req.params.id).select("-__v");

//   if (!post)
//     return res.status(404).send("The movie with the given ID was not found.");

//   res.send(movie);
// });

module.exports = router;
