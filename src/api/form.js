const formHandler = (req, res) => {
  let nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.GMAIL_PASSWORD,
    },
    secure: true,
  });
  if (!req.body.email) {
    return res.status(422).json("Email is required");
  }
  const mailData = {
    from: req.body.from,
    to: req.body.email ? req.body.email : "",
    subject: "Thanks for the inquiry!",
    html: req.body.emailBody ? `<p>${req.body.emailBody}</p>` : "Null message.",
	};
	transporter
    .sendMail(mailData)
    .then((result) => res.status(200).json(JSON.stringify(result)))
    .catch((error) => res.status(500).json(JSON.stringify(error)));
};
export default formHandler;
