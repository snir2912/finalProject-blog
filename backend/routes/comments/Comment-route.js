const express = require("express");
const {
  createComment,
  getAllComments,
  getOneComment,
  updateComment,
  deleteComment,
} = require("../../controller/comments/comment-controller");
const authMiddleware = require("../../middlewares/Auth/authMiddleware");

const commentRoute = express.Router();

commentRoute.post("/", authMiddleware, createComment);
commentRoute.get("/", getAllComments);
commentRoute.get("/:id", authMiddleware, getOneComment);
commentRoute.put("/:id", authMiddleware, updateComment);
commentRoute.delete("/:id", authMiddleware, deleteComment);

module.exports = commentRoute;
