const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../models/comment-model/comment-model");

const createComment = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  const { postId, description } = req.body;

  try {
    const comment = await Comment.create({
      post: postId,
      user: user,
      description: description,
    });
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

const getAllComments = expressAsyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find({}).sort("-created");
    res.json(comments);
  } catch (error) {
    res.json(error);
  }
});

module.exports = { createComment, getAllComments };
