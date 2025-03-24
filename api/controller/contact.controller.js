import { Contact } from "../models/contact.model.js";
// import { User } from "../models/user.model.js";
import nodemailer from "nodemailer";

export const sendMessage = async (req, res) => {
  try {
    const { subject, message } = req.body;

    const newMessage = new Contact({
      userId: req.user.id, // User ID from verifyToken middleware
      subject,
      message,
    });

    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send message." });
  }
};


export const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().populate("userId", "name email").sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
};


 

export const replyMessage = async (req, res) => {
    try {
      const { id, reply } = req.body;
  
      // Find the message and populate user email
      const message = await Contact.findById(id).populate("userId", "email");
  
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
  
      const userEmail = message.userId.email;
  
      // Nodemailer transporter setup
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER, // Your Gmail ID
          pass: process.env.EMAIL_PASS, // Your App Password
        },
      });
  
      // Email message with professional format
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: `Response from Aashray Realty`,
        text: `Dear Valued Customer,
  
  Thank you for reaching out to Aashray Realty. We appreciate your interest in our services and are committed to assisting you in finding your dream property.
  
  Here is our response to your query:
  
  "${reply}"
  
  If you need further assistance, feel free to contact us again. We are always happy to help.
  
  Best Regards,  
  Aashray Realty Team  
  http://aashrayRealty.in
  Contact: +91 97235 16494  
  `,
      };
    // Website: www.aashrayRealty.com  
      // Send email
      await transporter.sendMail(mailOptions);
  
      // Update message status and store reply in DB
      message.replied = true;
      message.replyText = reply;
      await message.save();
  
      res.status(200).json({ message: "Reply sent successfully" });
    } catch (error) {
      console.error("Error sending reply:", error);
      res.status(500).json({ message: "Error sending reply", error: error.message });
    }
  };

  export const getUnansweredMessages = async (req, res) => {
    try {
      const count = await Contact.countDocuments({ replied: false });
      res.json({ count: count > 5 ? "5+" : count });
    } catch (error) {
      res.status(500).json({ message: "Error fetching messages", error });
    }
  }