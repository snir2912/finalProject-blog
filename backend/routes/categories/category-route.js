const express = require("express");
const {
  createCategory,
  getAllCategories,
  getOneCategory,
  uptadeCategory,
  deleteCategory,
} = require("../../controller/categories/categories-controller");
const authMiddleware = require("../../middlewares/Auth/authMiddleware");
const categoryRoute = express.Router();

categoryRoute.post("/", authMiddleware, createCategory);
categoryRoute.get("/", getAllCategories);
categoryRoute.get("/:id", getOneCategory);
categoryRoute.put("/:id", authMiddleware, uptadeCategory);
categoryRoute.delete("/:id", authMiddleware, deleteCategory);

module.exports = categoryRoute;
