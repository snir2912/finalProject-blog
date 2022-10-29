const express = require("express");
const {
  createCategory,
  getAllCategories,
  getOneCategory,
  uptadeCategory,
} = require("../../controller/categories/categories-controller");
const authMiddleware = require("../../middlewares/Auth/authMiddleware");
const categoryRoute = express.Router();

categoryRoute.post("/", authMiddleware, createCategory);
categoryRoute.get("/", authMiddleware, getAllCategories);
categoryRoute.get("/:id", authMiddleware, getOneCategory);
categoryRoute.put("/:id", authMiddleware, uptadeCategory);

module.exports = categoryRoute;
