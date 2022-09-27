const express = require("express");
const {
  userRegister,
  userLogin,
  getAllUsers,
  deleteUser,
  getUserDetails,
  userPofile,
  updateUser,
  updateUserPassword,
  followingUser,
} = require("../../controller/users/Users-controller");
const authMiddleware = require("../../middlewares/Auth/authMiddleware");

const userRoutes = express.Router();

userRoutes.post("/register", userRegister);
userRoutes.post("/login", userLogin);
userRoutes.get("/", authMiddleware, getAllUsers);
userRoutes.put("/password", authMiddleware, updateUserPassword);
userRoutes.put("/follow", authMiddleware, followingUser);
userRoutes.get("/profile/:id", authMiddleware, userPofile);
userRoutes.get("/:id", getUserDetails);
userRoutes.delete("/:id", deleteUser);
userRoutes.put("/:id", authMiddleware, updateUser);

module.exports = userRoutes;
