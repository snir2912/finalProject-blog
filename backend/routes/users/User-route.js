const express = require("express");
const {
  userRegisterCtrl,
  userLoginCtrl,
} = require("../../controller/users/Users-controller");
const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", userLoginCtrl);
// userRoutes.get();
// userRoutes.put();
// userRoutes.delete();

module.exports = userRoutes;
