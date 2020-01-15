const mongoose = require("mongoose");
const { Thread, validate, validateThreadUpdate } = require("../models/thread.model");
const validateObjectId = require("../middleware/validateObjectId");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const thread = await Thread.find()
    .select("-__v")
    .sort({datePosted: 'desc'});
  res.send(thread);
});

router.get("/thread/:id", validateObjectId, async (req, res) => {
  console.log(req.params.id);
  var post = await Thread.findById(req.params.id).select("-__v");
  if (!post)
    return res.status(404).send("The thread with the given ID was not found.");

  res.send(post);
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
    imageURL: posts.imageURL
  });
  await post.save();
  // user = _.pick(user, ["name", "_id"]);
  res.send(post);
});
router.put("/upvote", async (req, res) => {
  console.log(req.body)
  const posts = req.body;
  const { error } = validateThreadUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const post = await Thread.findByIdAndUpdate(
    posts._id,
    {
      $inc: { karma: 1 }
    },
    { new: true, strict: true, omitUndefined: true }
  );
  if (!post)
    return res.status(404).send("The issue with the given ID was not found.");

  res.send(req.body);
});
router.put("/removeupvote", async (req, res) => {
  console.log(req.body)
  const posts = req.body;
  const { error } = validateThreadUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const post = await Thread.findByIdAndUpdate(
    posts._id,
    {
      $inc: { karma: -1 }
    },
    { new: true, strict: true, omitUndefined: true }
  );
  if (!post)
    return res.status(404).send("The issue with the given ID was not found.");

  res.send(req.body);
});
router.delete("/", async (req, res) => {
  console.log(req.body);
  posts = req.body;
  const post = await Thread.findByIdAndRemove(posts._id);

  if (!post)
    return res.status(404).send("The thread with the given ID was not found.");
  res.send(post);
});

module.exports = router;
