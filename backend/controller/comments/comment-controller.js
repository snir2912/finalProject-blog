const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../models/comment-model/comment-model");
// const { post } = require("../../routes/comments/Comment-route");
// const validateMongodbId = require("../../utils/validateMongodbId");

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

module.exports = { createComment };
