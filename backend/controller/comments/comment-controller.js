const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../models/comment-model/comment-model");
const validateMongodbId = require("../../utils/validateMongodbId");

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

const getOneComment = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const comment = await Comment.findById(id);
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

const updateComment = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updateComment = await Comment.findByIdAndUpdate(
      id,
      { user: req?.user, description: req?.body.description },
      { new: true, runValidators: true }
    );
    res.json(updateComment);
  } catch (error) {
    res.json(error);
  }
});

const deleteComment = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    res.json(deletedComment);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createComment,
  getAllComments,
  getOneComment,
  updateComment,
  deleteComment,
};
