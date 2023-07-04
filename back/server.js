const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/contact", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  const contactEmail = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "",
      pass: "",
    },
  });

  const mail = {
    from: "",
    to: "",
    subject: "Contact Form Submission",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
  };

  console.log(req.body); // Log the request body

  try {
    await contactEmail.sendMail(mail);
    console.log("Email sent successfully");
    res.json({ status: "Message Sent" });
  } catch (error) {
    console.log("Error sending email:", error);
    res.json({ status: "ERROR" });
  }
});

app.listen(5002, () => console.log("Server Running"));
