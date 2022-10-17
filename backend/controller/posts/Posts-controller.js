const expressAsyncHandler = require("express-async-handler");
const Post = require("../../models/post-model/Post-model");
const validateMongodbId = require("../../utils/validateMongodbId");

const createPostCtrl = expressAsyncHandler(async (req, res) => {
  validateMongodbId(req.body.user);
  try {
    const post = await Post.create(req.body);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

module.exports = { createPostCtrl };
