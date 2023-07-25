const nodemailer = require("nodemailer");

const sendMail = async (senderName, senderEmail, receiverEmail, hostingName, renewalDate,client_name) => {
  try {
    let testAccount = await nodemailer.createTestAccount();
    // connect with the smtp
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'lyric.donnelly@ethereal.email',
        pass: 'm9sDSGbU6WBgFDHDfQ'
      }
    });

    const subject = `Hello ${receiverEmail}, Your ${hostingName} Is Expire on ${renewalDate}`;

    let info = await transporter.sendMail({
      from: `"${senderName}" <${senderEmail}>`, // sender address
      to: receiverEmail, // list of receivers
      subject: subject, // Subject line
      text: `your ${hostingName} will expire on ${renewalDate}.`, // plain text body
      html: `<b>Hello,</b><br><p>${client_name} your ${hostingName} hosting will expire on ${renewalDate}.</p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendMail;