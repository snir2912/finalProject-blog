const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./config/db/dbConnect");
const userRoute = require("./routes/users/User-route");
const postRoute = require("./routes/posts/Post-route");
const commentRoute = require("./routes/comments/Comment-route");
const emailsRoute = require("./routes/emails/Email-route");

const { errorHandler, notFound } = require("./middlewares/error/errorHandler");

const app = express();
dbConnect();

app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
app.use("/api/email", emailsRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running ${PORT}`));
