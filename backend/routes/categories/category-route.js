const express = require("express");
const {
  createCategory,
  getAllCategories,
  getOneCategory,
} = require("../../controller/categories/categories-controller");
const authMiddleware = require("../../middlewares/Auth/authMiddleware");
const categoryRoute = express.Router();

categoryRoute.post("/", authMiddleware, createCategory);
categoryRoute.get("/", authMiddleware, getAllCategories);
categoryRoute.get("/:id", authMiddleware, getOneCategory);

module.exports = categoryRoute;
