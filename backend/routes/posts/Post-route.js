const express = require("express");
const {
  createPostCtrl,
  getAllPosts,
  getSinglePostCtrl,
  updatePostCtrl,
  deletePostCtrl,
  addLikeToPostCtrl,
  addDisLikeToPostCtrl,
} = require("../../controller/posts/Posts-controller");
const authMiddleware = require("../../middlewares/Auth/authMiddleware");
const {
  PhotoUpload,
  postPhotoResize,
} = require("../../middlewares/uploads/photoUpload");

const postRoute = express.Router();

postRoute.post(
  "/",
  authMiddleware,
  PhotoUpload.single("image"),
  postPhotoResize,
  createPostCtrl
);
postRoute.put("/likes", authMiddleware, addLikeToPostCtrl);
postRoute.put("/dislikes", authMiddleware, addDisLikeToPostCtrl);
postRoute.get("/", getAllPosts);
postRoute.get("/:id", getSinglePostCtrl);
postRoute.put("/:id", authMiddleware, updatePostCtrl);
postRoute.delete("/:id", authMiddleware, deletePostCtrl);

module.exports = postRoute;
