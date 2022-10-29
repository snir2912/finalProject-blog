const expressAsyncHandler = require("express-async-handler");
const Category = require("../../models/category-model/category-model");

const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.create({
      user: req.user._id,
      title: req.body.title,
    });
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

const getAllCategories = expressAsyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.json(error);
  }
});

module.exports = { createCategory, getAllCategories };
