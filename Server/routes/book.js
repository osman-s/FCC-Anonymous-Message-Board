const mongoose = require("mongoose");
const { Book, validateBook } = require("../models/book.model");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const book = await Book.find()
    .select("-__v")
    .sort("title");
  res.send(book);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const posts = req.body;
  const { error } = validateBook(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let post = await Book.findOne({ title: posts.title });
  if (post) return res.status(400).send("Book already posted.");

  post = new Book({
    title: posts.title
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
