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
    const categories = await Category.find({})
      .populate("user")
      .sort("-createdAt");
    res.json(categories);
  } catch (error) {
    res.json(error);
  }
});

const getOneCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id)
      .populate("user")
      .sort("-createdAt");
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

const uptadeCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      {
        title: req.body?.title,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

const deleteCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const categoryDeleted = await Category.findByIdAndDelete(id, {
      new: true,
      runValidators: true,
    });
    res.json(categoryDeleted);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createCategory,
  getAllCategories,
  getOneCategory,
  uptadeCategory,
  deleteCategory,
};
