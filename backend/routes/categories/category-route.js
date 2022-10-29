const express = require("express");
const {
  createCategory,
} = require("../../controller/categories/categories-controller");
const authMiddleware = require("../../middlewares/Auth/authMiddleware");
const categoryRoute = express.Router();

categoryRoute.post("/", authMiddleware, createCategory);

module.exports = categoryRoute;
