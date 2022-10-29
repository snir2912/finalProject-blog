const express = require("express");
const {
  createComment,
  getAllComments,
} = require("../../controller/comments/comment-controller");
const authMiddleware = require("../../middlewares/Auth/authMiddleware");

const commentRoute = express.Router();

commentRoute.post("/", authMiddleware, createComment);
commentRoute.get("/", authMiddleware, getAllComments);

module.exports = commentRoute;
