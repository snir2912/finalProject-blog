const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      {
        message: "Unsupported file format",
      },
      false
    );
  }
};

const profilePhotoUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 },
});

const profilePohtoResize = async (req, res, next) => {
  if (!req.file) return next();

  req.file.fileName = `user-${Date.now()}-${req.file.originalname}`;

  await sharp(req.file.buffer)
    .resize(250, 250)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.join(`public/img/profiles/${req.file.fileName}`));
  next();
};

module.exports = { profilePhotoUpload, profilePohtoResize };
