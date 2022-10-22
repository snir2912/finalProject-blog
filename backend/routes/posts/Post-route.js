const express = require("express");
const {
  createPostCtrl,
  getAllPosts,
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
postRoute.get("/", getAllPosts);

module.exports = postRoute;
