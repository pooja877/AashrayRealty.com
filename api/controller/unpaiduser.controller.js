
import UnpaidUser from "../models/unpaiduser.model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { createPaymentLink } from "./renting.controller.js";
import UserNotification from "../models/userNotification.model.js";

dotenv.config();

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send payment reminder email and return link
export const sendPaymentReminderAPI = async (req, res) => {
  try {
    const { userId } = req.params;

    const unpaidUser = await UnpaidUser.findOne({ userId }).populate("userId", "email username");
    if (!unpaidUser) return res.status(404).json({ message: "User not found" });

    const userEmail = unpaidUser.userId.email;
    const rentAmount = unpaidUser.rentAmount;
    const dueDate = new Date(unpaidUser.dueDate).toLocaleDateString();

    // Generate payment link
    const paymentLink = await createPaymentLink(rentAmount, userEmail, userId);
    if (!paymentLink) return res.status(500).json({ message: "Failed to generate payment link" });

    const newNotification = new UserNotification({
      userId,
      message: `Rent Payment Reminder,Pay Rent!!`,
    });

    // Save the notification
    await newNotification.save();
    // Send email with the payment link
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Rent Payment Reminder - AashrayRealty",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <p>Dear ${unpaidUser.userId.username},</p>
          <p>Your rent of <strong>₹${rentAmount}</strong> is due on <strong>${dueDate}</strong>. Please make the payment at the earliest.</p>
          <p>Click the button below to pay your rent:</p>
          <p>
            <a href="${paymentLink}" target="_blank"
              style="display: inline-block; padding: 12px 24px; background-color: #28a745; color: white;
                    text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 5px;">
              Pay Rent
            </a>
          </p>
          <p>If you have already made the payment, please ignore this message.</p>
          <p>Thank you!</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.json({ message: "Reminder email sent successfully!", paymentLink });
  } catch (error) {
    console.error("Error sending payment reminder:", error);
    return res.status(500).json({ message: "Failed to send reminder" });
  }
};

// Assuming you have UnpaidUser and User models imported

export const getAllUnpaidUsers = async (req, res) => {
    try {
      const unpaidUsers = await UnpaidUser.find()
        .populate('userId', 'username email') // Populate userId with username and email
        .sort({ createdAt: -1 });
  
      res.status(200).json(unpaidUsers); // Send the unpaid users with populated data
    } catch (error) {
      res.status(500).json({ message: "Error fetching unpaid users", error });
    }
  };
  
  export const deleteUnpaidUser = async (req, res) => {
    try {
      await UnpaidUser.findByIdAndDelete(req.params.id);
      res.json({ message: "Unpaid user deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete unpaid user" });
    }
  };
  


// export const getAllUnpaidUsers = async (req, res) => {
//     try {
//         const unpaidUsers = await UnpaidUser.find().sort({ createdAt: -1 });
//         res.status(200).json(unpaidUsers);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching Bookings", error });
//     }
// };
// export const deleteUnpaidUser = async (req, res) => {
//     try {
//         await UnpaidUser.findByIdAndDelete(req.params.id);
//         res.json({ message: "unpaidUser deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ error: "Failed to delete Booking" });
//     }
// };