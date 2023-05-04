const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });
  const mailOptions = {
    from: options.from || process.env.SMPT_MAIL,
    to: options.to || options.email,
    subject: options.subject,
    text: options.message,
  };
  console.log(mailOptions)

  // await transporter.sendMail(emailOption);
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
