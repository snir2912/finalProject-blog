const expressAsyncHandler = require("express-async-handler");
const sgMail = require("@sendgrid/mail");
const EmailMsg = require("../../models/emailMessaging/Email-messaging-model");

const sendEmail = expressAsyncHandler(async (req, res) => {
  console.log(req.user);
  const { to, subject, message } = req.body;
  try {
    const msg = {
      to,
      subject,
      text: message,
      from: "snir1290@outlook.com",
    };

    await sgMail.send(msg);

    await EmailMsg.create({
      sentBy: req?.user?._id,
      from: req?.user?.email,
      to,
      message,
      subject,
    });
    res.json("Mail sent");
  } catch (error) {
    res.json(error);
  }
});

module.exports = { sendEmail };
