const express = require("express");
const { createPostCtrl } = require("../../controller/posts/Posts-controller");
const authMiddleware = require("../../middlewares/Auth/authMiddleware");

const postRoute = express.Router();

postRoute.post("/", authMiddleware, createPostCtrl);

module.exports = postRoute;
