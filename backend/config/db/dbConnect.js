const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      //   useCreateindex: true,
      //   useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("db is conected");
  } catch (error) {
    console.log(`Error ${error.message}`);
  }
  //   mongoose
  //     .connect("mongodb://localhost/my_blog", {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //     })
  //     .then(() => console.log("Connected to MongoDB..."))
  //     .catch(err => console.error("Could not connect to MongoDB..."));
};

// const dbConnect = async () => {
//   try {
//     const connected = await mongoose.connect(process.env.MONGODB_URL, {
//       useNewUrlParser: true,
//     });

//     console.log(`MongoDB Connected ${connected.connection.host}`);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit();
//   }
// };

module.exports = dbConnect;
