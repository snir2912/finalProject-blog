const expressAsyncHandler = require("express-async-handler");
const sgMail = require("@sendgrid/mail");
const EmailMsg = require("../../models/emailMessaging/Email-messaging-model");
const Filter = require("bad-words");

const sendEmail = expressAsyncHandler(async (req, res) => {
  const { to, subject, message } = req.body;
  const emailMessage = subject + " " + message;
  const filter = new Filter();

  const isProfane = filter.isProfane(emailMessage);
  if (isProfane) throw new Error("התמשת במילים אסורות, אנא נסו שוב.");

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
