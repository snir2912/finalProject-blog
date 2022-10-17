const expressAsyncHandler = require("express-async-handler");
const sgMail = require("@sendgrid/mail");
const crypto = require("crypto");
const generateToken = require("../../config/token/genrateToke");
const User = require("../../models/user-model/User-model");
const validateMongodbId = require("../../utils/validateMongodbId");
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const userRegister = expressAsyncHandler(async (req, res) => {
  const userExists = await User.findOne({ email: req?.body?.email });

  if (userExists) throw new Error("קיים פרופיל עם אותו דואר אלקטרוני");
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

const userLogin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({ email });

  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.json({
      _id: userFound?._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
    });
  } else {
    res.status(401);
    throw new Error("משהו השתבש, נסו שנית");
  }
});

const getAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

const deleteUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    res.json(error);
  }
});

const getUserDetails = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

const userPofile = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const myProfile = await User.findById(id);
    res.json(myProfile);
  } catch (error) {
    res.json(error);
  }
});

const updateUser = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  validateMongodbId(_id);

  const user = await User.findByIdAndUpdate(
    _id,
    {
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      bio: req?.body?.bio,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.json(user);
});

const updateUserPassword = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);

  const user = await User.findById(_id);

  if (password) {
    user.email = user.email;
    user.firstName = user.firstName;
    user.lastName = user.lastName;
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.json(user);
  }
});

const followingUser = expressAsyncHandler(async (req, res) => {
  const { followId } = req.body;
  const loginUserId = req.user.id;

  const targetUser = await User.findById(followId);

  const alreadyFollowing = targetUser?.followers?.find(
    user => user?.toString() === loginUserId.toString()
  );

  if (alreadyFollowing)
    throw new Error("הפרופיל המבוקש כבר נמצא ברשימת העוקבים");

  await User.findByIdAndUpdate(
    followId,
    {
      $push: { followers: loginUserId },
    },
    { new: true }
  );

  await User.findByIdAndUpdate(
    loginUserId,
    {
      $push: { following: followId },
      isFollowing: true,
    },
    { new: true }
  );
  res.json("עוקב");
});

const unFollowUser = expressAsyncHandler(async (req, res) => {
  const { unfollowId } = req.body;
  const loginUserId = req.user.id;

  await User.findByIdAndUpdate(
    unfollowId,
    {
      $pull: { followers: loginUserId },
      isFollowing: false,
    },
    { new: true }
  );
  await User.findOneAndUpdate(
    loginUserId,
    {
      $pull: { followers: loginUserId },
      isFollowing: false,
    },
    { new: true }
  );
  res.json("הפרופיל כבר לא ברשימת העוקבים שלך");
});

const blockUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    { new: true }
  );
  res.json(user);
});
const unBlockUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: false,
    },
    { new: true }
  );
  res.json(user);
});

// // const generateVerificationToken = expressAsyncHandler(async (req, res) => {
// //   const loginUserId = req.user.id;
// //   const user = await User.findById(loginUserId);
// //   try {
// //     const verificationToken = await user.createAccountVerificationToken();
// //     await user.save();
// //     const verifyMsg =
// //       "בכדי לאמת את החשבון, אנא לחצו על הלינק המצורף בתוך 10 דקות, אחרת התעלמו מהודעה זו";

// //     const resetURL = `${verifyMsg} <a href="http://localhost:7777/verify-account/${verificationToken}">אימות החשבון</a>`;
// //     const msg = {
// //       to: "snir2912@gmail.com",
// //       from: "snir1290@outlook.com",
// //       subject: "test email sending",
// //       html: resetURL,
// //     };
// //     await sgMail.send(msg);
// //     res.json(resetURL);
// //   } catch (error) {
// //     res.json(error);
// //   }
// // });
const generateVerificationTokenCtrl = expressAsyncHandler(async (req, res) => {
  const loginUserId = req.user.id;

  const user = await User.findById(loginUserId);

  try {
    //Generate token
    const verificationToken = await user.AccountVerificationToken();
    //save the user
    await user.save();
    console.log(verificationToken);
    //build your message

    const resetURL = `If you were requested to verify your account, verify now within 10 minutes, otherwise ignore this message <a href="http://localhost/:7777/verify-account/${verificationToken}">Click to verify your account</a>`;
    const msg = {
      to: "snir2912@gmail.com",
      from: "snir1290@outlook.com",
      subject: "My first Node js email sending",
      html: resetURL,
    };

    await sgMail.send(msg);
    res.json(resetURL);
  } catch (error) {
    res.json(error);
  }
});
// // const accountVerification = expressAsyncHandler(async (req, res) => {
// //   const { token } = req.body;
// //   const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

// //   const userFound = await User.findOne({
// //     accountVerificationToken: hashedToken,
// //     accountVerificationTokenExpires: { $gt: new Date() },
// //   });
// //   if (!userFound) throw new Error("אין הרשאה, נסה שנית מאוחר יותר");
// //   userFound.isAccountVerified = true;
// //   userFound.accountVerificationToken = undefined;
// //   userFound.accountVerificationTokenExpires = undefined;

// //   await userFound.save();
// //   res.json(userFound);
// // });
const accountVerificationCtrl = expressAsyncHandler(async (req, res) => {
  const { token } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  //find this user by token
  const userFound = await User.findOne({
    accountVerificationToken: hashedToken,
    accountVerificationTokenExpires: { $gt: new Date() },
  });

  if (!userFound) throw new Error("Token expired, try again later");
  //update the proprt to true
  userFound.isAccountVerified = true;
  userFound.accountVerificationToken = undefined;
  userFound.accountVerificationTokenExpires = undefined;
  await userFound.save();
  res.json(token);
});

const forgetPasswordToken = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new Error("user not found");

  try {
    const token = await user.generatePasswordResetToken();
    console.log(token);
    await user.save();

    const resetURL = `If you were requested to reset your password, reset now within 10 minutes, otherwise ignore this message <a href="http://localhost:7777/forget-password/${token}">Click to reset your password</a>`;
    const msg = {
      to: email,
      from: "snir1290@outlook.com",
      subject: "reset your password",
      html: resetURL,
    };
    await sgMail.send(msg);
    res.json(
      `msg: A verification message is successfully sent to ${user?.email}. Reset now within 10 minutes, ${resetURL} `
    );
  } catch (error) {
    res.json(error);
  }
});

const passwordReset = expressAsyncHandler(async (req, res) => {
  const { token, password } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token Expired, try again later");

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

module.exports = {
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
  forgetPasswordToken,
  passwordReset,
};
