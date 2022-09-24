const User = require("../../models/user-model/User-model");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../config/token/genrateToke");

const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
  const userExists = await User.findOne({ email: req?.body?.email });

  if (userExists) throw new Error("User aleady exists");
  try {
    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

const userLoginCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({ email });

  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.json(userFound);
  } else {
    res.status(401);
    throw new Error("Invalid Login Credentials");
  }
});

module.exports = { userRegisterCtrl, userLoginCtrl };
