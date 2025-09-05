import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { fullName, email, event, goals } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Calebfoster101@gmail.com",
        pass: "eaxa ulug doqn tjun"
      }
    });

    await transporter.sendMail({
      from: `"${fullName}" <${email}>`,
      to: "Calebfoster101@gmail.com",
      subject: `New Coaching Inquiry from ${fullName}`,
      text: `Name: ${fullName}\nEmail: ${email}\nEvent: ${event}\nGoals: ${goals}`
    });

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
