const nodemailer = require("nodemailer");
export default function formHandler(req, res) {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
  transporter.sendMail({
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject || "[No subject]",
    html: req.body.message || "[No message]",
  });
  if (!req.body.name) {
    return res.status(422).json("Name field is required");
  }

  return res.json(`OK`);
}
