const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ]
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;