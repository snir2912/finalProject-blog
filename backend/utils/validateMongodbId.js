const mongoose = require("mongoose");

const validateMongodbId = id => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("הפרופיל לא נמצא או שמספר המזהה שלו אינו חוקי");
};

module.exports = validateMongodbId;
