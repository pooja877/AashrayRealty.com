import  Contact  from "../models/contact.model.js";
// import { User } from "../models/user.model.js";
import nodemailer from "nodemailer";
import UserNotification from "../models/userNotification.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { subject, message } = req.body;

    const newMessage = new Contact({
      userId: req.user.id, // User ID from verifyToken middleware
      category:"contact",
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
    const messages = await Contact.find().populate("userId", "username email").sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
};

export const replyMessage = async (req, res) => {
  try {
      const { id, reply } = req.body;

      // Ensure the reply message and id are provided
      if (!id || !reply) {
          return res.status(400).json({ message: "Message ID and reply are required." });
      }

      // Find the message by id
      const message = await Contact.findById(id).populate("userId", "email");

      if (!message) {
          return res.status(404).json({ message: "Message not found" });
      }

       const newNotification = new UserNotification({
            userId:message.userId,
            message: `Our  response to your query ${reply}`});
            
          await newNotification.save();
      const userEmail = message.userId.email;

      
      // Set up Nodemailer transporter
      const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
              user: process.env.EMAIL_USER, // Your Gmail ID
              pass: process.env.EMAIL_PASS, // Your App Password
          },
      });

      // Create the email message
      const mailOptions = {
          from: process.env.EMAIL_USER,
          to: userEmail,
          subject: `Response from AashrayRealty`,
          text: `Dear Valued Customer,

Thank you for reaching out to AashrayRealty. We appreciate your interest in our services and are committed to assisting you in finding your dream property.

Here is our response to your query:

"${reply}"

If you need further assistance, feel free to contact us again. We are always happy to help.

Best Regards,  
AashrayRealty Team  
http://aashrayRealty.in
Contact: +91 97235 16494`,
      };

      // Send the reply email
      await transporter.sendMail(mailOptions);

      // Update the message with the reply and mark it as replied
      message.replied = true;
      message.replyText = reply;
      await message.save();

      res.status(200).json({ message: "Reply sent successfully" });
  } catch (error) {
      console.error("Error sending reply:", error);
      res.status(500).json({ message: "Error sending reply", error: error.message });
  }
};

export const getUnreadNotificationsCount = async (req, res) => {
  try {
    // Count all unread notifications (those with `read: false`)
    const unreadNotificationsCount = await Contact.countDocuments({ read: false });

    // Respond with the count of unread notifications
    res.json({ count: unreadNotificationsCount });
  } catch (error) {
    console.error("Error fetching unread notifications count:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller to mark notifications as read
export const markNotificationsAsRead = async (req, res) => {
  try {
    // Update all unread notifications to `read: true`
    const result = await Contact.updateMany(
      { read: false },  // Target only unread notifications
      { $set: { read: true } }  // Set `read` to `true`
    );

    // Respond with a success message
    res.json({ message: "Notifications marked as read", updatedCount: result.nModified });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
 // ContactController.js
// ContactController.js
export const getUnansweredMessages = async (req, res) => {
  try {
    const categories = ['contact', 'booking', 'user'];  // Add more categories as needed
    let counts = {};

    for (const category of categories) {
      const count = await Contact.countDocuments({ category, replied: false });
      counts[category] = count > 5 ? "5+" : count;
    }

    res.json(counts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
};


  
export const deleteMessage = async (req, res) => {
  try {
      const { id } = req.params;
      await Contact.findByIdAndDelete(id);
      res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
      res.status(500).json({ error: "Failed to delete message" });
  }
};

// ContactController.js
export const deleteAllMessages = async (req, res) => {
  try {
    const { category } = req.params;

    // Delete all messages in the specified category
    const result = await Contact.deleteMany({ category });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "No messages found in this category" });
    }

    res.status(200).json({ message: `All messages in the "${category}" category deleted successfully!` });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete all messages" });
  }
};



export const getMessagesByCategory = async (req, res) => {
  try {
    const { category } = req.params;  // Get the category from URL parameter
    const messages = await Contact.find({ category })
      .populate("userId", "email")
      .sort({ createdAt: -1 });  // Sort messages by creation date

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching messages." });
  }
};
export const deleteNotificationsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const deleted = await Contact.deleteMany({ category });

    res.json({ message: `${deleted.deletedCount} notifications deleted.` });
  } catch (error) {
    console.error("Error deleting notifications by category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};