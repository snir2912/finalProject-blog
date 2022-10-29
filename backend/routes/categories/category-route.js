const express = require("express");
const {
  createCategory,
  getAllCategories,
} = require("../../controller/categories/categories-controller");
const authMiddleware = require("../../middlewares/Auth/authMiddleware");
const categoryRoute = express.Router();

categoryRoute.post("/", authMiddleware, createCategory);
categoryRoute.get("/", authMiddleware, getAllCategories);

module.exports = categoryRoute;
