const expressAsyncHandler = require("express-async-handler");
const Post = require("../../models/post-model/Post-model");
const validateMongodbId = require("../../utils/validateMongodbId");
const Filter = require("bad-words");
const User = require("../../models/user-model/User-model");
const cloudinaryUploadImg = require("../../utils/cloudinary");

const createPostCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req.file);
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
    const post = await Post.create({
      ...req.body,
      user: _id,
      image: imgUploaded?.url,
    });
    res.json(post);

    fs.unlinkSync(localPath);
  } catch (error) {
    res.json(error);
  }
});
const getAllPosts = expressAsyncHandler(async (req, res) => {
  const hasCategory = req.query.category;
  try {
    if (hasCategory) {
      const posts = await Post.find({ category: hasCategory })
        .populate("user")
        .populate("comments");
      res.json(posts);
    } else {
      const posts = await Post.find({}).populate("user").populate("comments");
      res.json(posts);
    }
  } catch (error) {
    res.json(error);
  }
});

const getSinglePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findById(id)
      .populate("user")
      .populate("disLikes")
      .populate("likes")
      .populate("comments");
    await Post.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

const updatePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        ...req.body,
        user: req.user?._id,
      },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

const deletePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findByIdAndDelete(id);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

const addLikeToPostCtrl = expressAsyncHandler(async (req, res) => {
  const { postId } = req.body;
  const post = await Post.findById(postId);
  const loginUserId = req?.user?._id;

  const isLiked = post?.isLiked;

  const alreadyDisliked = post?.disLikes?.find(
    userId => userId?.toString() === loginUserId?.toString()
  );

  if (alreadyDisliked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(post);
  }

  if (isLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(post);
  }
});

const addDisLikeToPostCtrl = expressAsyncHandler(async (req, res) => {
  const { postId } = req.body;
  const post = await Post.findById(postId);
  const loginUserId = req?.user?._id;

  const isDisLiked = post?.isDisLiked;

  const alreadyliked = post?.likes?.find(
    userId => userId?.toString() === loginUserId?.toString()
  );

  if (alreadyliked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  }

  if (isDisLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { disLikes: loginUserId },
        isDisLiked: true,
      },
      { new: true }
    );
    res.json(post);
  }
});
module.exports = {
  createPostCtrl,
  getAllPosts,
  getSinglePostCtrl,
  updatePostCtrl,
  deletePostCtrl,
  addLikeToPostCtrl,
  addDisLikeToPostCtrl,
};
