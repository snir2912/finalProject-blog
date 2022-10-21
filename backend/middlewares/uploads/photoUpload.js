const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
//storage
const multerStorage = multer.memoryStorage();

//file type checking
const multerFilter = (req, file, cb) => {
  //check file type
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    //rejected files
    cb(
      {
        message: "Unsupported file format",
      },
      false
    );
  }
};

const PhotoUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 },
});

//Image Resizing
const profilePhotoResize = async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${Date.now()}-${req.file.originalname}`;

  await sharp(req.file.buffer)
    .resize(250, 250)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.join(`public/img/profiles/${req.file.filename}`));
  next();
};

const postPhotoResize = async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${Date.now()}-${req.file.originalname}`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.join(`public/img/posts/${req.file.filename}`));
  next();
};
module.exports = { PhotoUpload, profilePhotoResize, postPhotoResize };
