const express = require("express");
const app = express();
const port = process.env.PORT;
const dotenv = require("dotenv");
dotenv.config();
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");
const dbConnect = require("./config/db/dbConnect");
dbConnect();

const userRoutes = require("./routes/users/User-route");

app.use(express.json());

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port || 3000, console.log(`server is running on port ${port} `));
