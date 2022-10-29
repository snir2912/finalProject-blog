const express = require("express");
const {
  createComment,
  getAllComments,
  getOneComment,
  updateComment,
} = require("../../controller/comments/comment-controller");
const authMiddleware = require("../../middlewares/Auth/authMiddleware");

const commentRoute = express.Router();

commentRoute.post("/", authMiddleware, createComment);
commentRoute.get("/", authMiddleware, getAllComments);
commentRoute.get("/:id", authMiddleware, getOneComment);
commentRoute.put("/:id", authMiddleware, updateComment);

module.exports = commentRoute;
