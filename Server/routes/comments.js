const mongoose = require("mongoose");
const { Thread } = require("../models/thread.model");
const { Comment, validateComment } = require("../models/comment.model");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const comments = await Comment.find()
    .select("-__v")
    .sort({ datePosted: "desc" });
    if (!comments)
    return res.status(404).send("The comment with the given threadID was not found.");
  res.send(comments);
});

router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  _id = mongoose.Types.ObjectId(req.params.id);
  // _id = req.params.id;
  const comment = await Comment.find({
    "thread._id": _id
  }).sort({ datePosted: "desc" });
  res.send(comment);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const posts = req.body;
  const { error } = validateComment(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let thread = await Thread.findById(posts.threadId);
  if (!thread) return res.status(400).send("Invalid Thread.");

  post = new Comment({
    thread: {
      _id: thread._id,
      username: thread.username,
      password: thread.password,
      subject: thread.subject,
      message: thread.message,
      imageURL: thread.imageURL,
      karma: thread.karma,
      datePosted: thread.datePosted
    },
    username: posts.username,
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

module.exports = router;
