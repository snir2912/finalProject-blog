const expressAsyncHandler = require("express-async-handler");
const Post = require("../../models/post-model/Post-model");
const validateMongodbId = require("../../utils/validateMongodbId");
const Filter = require("bad-words");
const User = require("../../models/user-model/User-model");
const cloudinaryUploadImg = require("../../utils/cloudinary");

const createPostCtrl = expressAsyncHandler(async (req, res) => {
  // console.log(req.file);
  const { _id } = req.user;
  const filter = new Filter();
  const isProfane = filter.isProfane(req.body.title, req.body.description);

  if (isProfane) {
    await User.findByIdAndUpdate(_id, {
      isBlocked: true,
    });
    throw new Error(
      "Creating Failed because it contains profane words and you have been blocked"
    );
  }

  const localPath = `public/img/posts/${req.file.filename}`;
  const imgUploaded = await cloudinaryUploadImg(localPath);
  try {
    // const post = await Post.create({
    //   ...req.body,
    //   image: imgUploaded?.url,
    //   user: _id,
    // });
    res.json(imgUploaded);
    //Remove uploaded img
    fs.unlinkSync(localPath);
  } catch (error) {
    res.json(error);
  }
  //s
});

module.exports = { createPostCtrl };
