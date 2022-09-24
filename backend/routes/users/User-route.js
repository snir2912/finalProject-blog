const express = require("express");
const {
  userRegisterCtrl,
  userLoginCtrl,
  getAllUsers,
  deleteUser,
  getUserDetails,
  userPofile,
  updateUser,
} = require("../../controller/users/Users-controller");
const authMiddleware = require("../../middlewares/Auth/authMiddleware");

const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", userLoginCtrl);
userRoutes.get("/", authMiddleware, getAllUsers);
userRoutes.get("/profile/:id", authMiddleware, userPofile);
userRoutes.get("/:id", getUserDetails);
userRoutes.delete("/:id", deleteUser);
userRoutes.put("/:id", authMiddleware, updateUser);

module.exports = userRoutes;
