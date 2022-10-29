const express = require("express");
const {
  createComment,
} = require("../../controller/comments/comment-controller");
const authMiddleware = require("../../middlewares/Auth/authMiddleware");

const commentRoute = express.Router();

commentRoute.post("/", authMiddleware, createComment);

module.exports = commentRoute;
