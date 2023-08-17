const nodemailer = require("nodemailer");
const { GMAIL_PASSWORD, GMAIL_USERNAME } = require("../config/config");

module.exports = {
  sendMailController: async (req, res) => {
    console.log("inside mail controller");
    const data = req.body;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USERNAME,
        pass: GMAIL_PASSWORD,
      },
    });

    let html = `<html>
      <body>
      <h2>${data?.name}</h2>
      <p>Thank you for Purchasing Products</p>
      <p>Regards</p>
      <p>Product Services</p>
      </body>
      </html>`;

    // Convert the Base64 PDF data to binary buffer
    const pdfAttachment = Buffer.from(data?.pdfBase64.split("base64,")[1], "base64");

    let message = {
      from: "srevathisona@gmail.com",
      to: data?.email,
      subject: "Product Subject Info!",
      html: html,
      attachments: [
        {
          filename: "order.pdf",
          content: pdfAttachment, // Use the binary buffer here
          contentType: "application/pdf", // Set the correct content type
        },
      ],
    };

    try {
      const info = await transporter.sendMail(message);
      console.log(info);
      return res.json({ message: "Successfully Sent the Mail!!!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Error while Sending Mail" });
    }
  },
};
