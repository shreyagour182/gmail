const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

const GMAIL_USER = "shreyagour100@gmail.com";
const GMAIL_PASS = "xogtyynucwfdbwil";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

exports.sendMail = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Only POST requests allowed");
  }

  const {name, email, message} = req.body;

  const mailOptions = {
    from: email,
    to: GMAIL_USER,
    subject: `New message from ${name}`,
    text: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Failed to send email");
  }
});
