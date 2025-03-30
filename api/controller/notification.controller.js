import nodemailer from "nodemailer";
import { Notification } from "../models/notification.model.js";
import Booking from "../models/booking.model.js";

// ✅ Setup Email Transporter (Move to Top)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Send reminder for expiring bookings
export const sendExpiryReminders = async () => {
  try {
    const currentDate = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(currentDate.getDate() + 1);

    const expiringBookings = await Booking.find({ expiresAt: { $lte: tomorrow }, status: "Booked" });

    if (expiringBookings.length === 0) return;

    const emails = expiringBookings
      .filter((booking) => booking.email) // Ensure email exists
      .map((booking) =>
        transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: booking.email,
          subject: "Aashray Realty - Booking Expiry Reminder",
          html: `<p>Your booking for <strong>${booking.propertyName}</strong> is expiring soon. Please visit the property or it will be marked as expired.</p>`,
        })
      );

    await Promise.all(emails); // ✅ Send all emails simultaneously
  } catch (error) {
    console.error("Error sending expiry reminders:", error);
  }
};

// ✅ Store user email when they click "Notify Me"
export const addInterestedUser = async (req, res) => {
  try {
    const { propertyId, email } = req.body;
    if (!propertyId || !email) {
      return res.status(400).json({ message: "Property ID and Email are required" });
    }

    const existing = await Notification.findOne({ propertyId, email });
    if (existing) {
      return res.status(400).json({ message: "Already subscribed for notifications" });
    }

    await Notification.create({ propertyId, email });
    res.json({ message: "You will be notified when the property is available." });
  } catch (error) {
    console.error("Error saving notification request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Notify all interested users when property is available
export const notifyInterestedUsers = async (propertyId) => {
  try {
    const interestedUsers = await Notification.find({ propertyId });

    if (interestedUsers.length === 0) return;

    const emails = interestedUsers.map((user) =>
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Aashray Realty - Property Now Available",
        html: `<p>The property you were interested in is now available. <a href="https://aashrayrealty.com/property/${propertyId}">Click here</a> to book it.</p>`,
      })
    );

    await Promise.all(emails); // ✅ Send all emails at once

    // ✅ Remove all users after sending notifications
    await Notification.deleteMany({ propertyId });

  } catch (error) {
    console.error("Error sending notifications:", error);
  }
};
