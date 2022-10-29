const express = require("express");
const { sendEmail } = require("../../controller/emails/emails-controller");
const authMiddleware = require("../../middlewares/Auth/authMiddleware");
const emailsRoute = express.Router();

emailsRoute.post("/", authMiddleware, sendEmail);

module.exports = emailsRoute;
