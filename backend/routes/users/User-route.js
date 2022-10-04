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
  unFollowUser,
  blockUser,
  unBlockUser,
  generateVerificationTokenCtrl,
  accountVerificationCtrl,
} = require("../../controller/users/Users-controller");
const authMiddleware = require("../../middlewares/Auth/authMiddleware");

const userRoutes = express.Router();

userRoutes.post("/register", userRegister);
userRoutes.post("/login", userLogin);
userRoutes.get("/", authMiddleware, getAllUsers);
userRoutes.put("/password", authMiddleware, updateUserPassword);
userRoutes.put("/follow", authMiddleware, followingUser);
userRoutes.put("/unfollow", authMiddleware, unFollowUser);
userRoutes.put("/block-user/:id", authMiddleware, blockUser);
userRoutes.put("/unblock-user/:id", authMiddleware, unBlockUser);
userRoutes.get("/profile/:id", authMiddleware, userPofile);
userRoutes.get("/:id", getUserDetails);
userRoutes.delete("/:id", deleteUser);
userRoutes.put("/:id", authMiddleware, updateUser);
userRoutes.post(
  "/generate-verify-email-token",
  authMiddleware,
  generateVerificationTokenCtrl
);
userRoutes.put("/verify-account", authMiddleware, accountVerificationCtrl);

module.exports = userRoutes;
