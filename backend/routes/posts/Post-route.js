const express = require("express");
const { createPostCtrl } = require("../../controller/posts/Posts-controller");
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

module.exports = postRoute;
