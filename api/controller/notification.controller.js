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
          subject: "AashrayRealty - Your Booking is Expiring Soon!",
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
              <h2 style="color: #d9534f;">⏳ Urgent: Your Booking is About to Expire!</h2>
              <p>Dear Customer,</p>
        
              <p>We hope you are doing well. This is a reminder that your booking for the following property is set to expire soon:</p>
        
              <h3>📌 Booking Details:</h3>
              <ul>
                <li><strong>Property Name:</strong> ${booking.propertyName}</li>
                <li><strong>Expiry Date:</strong> ${booking.expiresAt.toDateString()}</li>
              </ul>
        
              <p>To confirm your visit or complete the necessary steps, please take action before the expiry date.</p>
              <p>If no action is taken, the booking will be automatically marked as <strong style="color: red;">expired</strong>, and the property will be available to other interested buyers.</p>
        
              <p>For any assistance, feel free to contact our support team.</p>
        
              <p>Best Regards,<br>
              <strong>AashrayRealty Team</strong></p>
        
              <hr style="border: none; border-top: 1px solid #ddd;">
              <p style="font-size: 12px; color: #666;">For any queries, reach us at ${process.env.SUPPORT_EMAIL} or call us at ${process.env.CONTACT_NUMBER}.</p>
            </div>
          `,
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
    const { propertyId, email, userId } = req.body; // Get userId
    if (!propertyId || !email || !userId) {
      return res.status(400).json({ message: "Property ID, Email, and User ID are required" });
    }

    const existing = await Notification.findOne({ propertyId, email });
    if (existing) {
      return res.status(400).json({ message: "Already subscribed for notifications" });
    }

    await Notification.create({ 
      propertyId, 
      email, 
      userId, 
      message: "You will be notified when the property is available." 
    });

    res.json({ message: "You will be notified when the property is available." });
  } catch (error) {
    console.error("Error saving notification request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




export const notifyInterestedUsers = async (propertyId) => {
  try {
    // console.log("🔍 Checking notifications for Property ID:", propertyId);

    const interestedUsers = await Notification.find({ propertyId });

    if (interestedUsers.length === 0) {
      console.log("⚠️ No interested users found for this property.");
      return;
    }

    console.log("📩 Sending emails to:", interestedUsers.map(user => user.email));

    const emails = interestedUsers.map(user =>
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "AashrayRealty - Property Now Available for Booking",
        html: ` 
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #28a745;">Great News! A Property is Now Available</h2>
            <p>Dear Valued Customer,</p>
      
            <p>The property you were interested in is now available for booking again. Don't miss this opportunity to secure it before someone else does!</p>
      
            <h3>🏡 Property Details:</h3>
            <ul>
              <li><strong>Property Name:</strong> ${propertyName}</li>
              <li><strong>Location:</strong> ${propertyLocation}</li>
              <li><strong>Current Status:</strong> Available</li>
            </ul>
      
            <p>📌 Act fast before it gets booked again! If you're still interested, you can proceed with the booking at your earliest convenience.</p>
      
            <h3>❓ Need Assistance?</h3>
            <p>Our team is here to help! If you have any questions, feel free to reach out to us.</p>
      
            <p>We look forward to helping you find your dream property!</p>
      
            <p>Best Regards,</p>
            <p><strong>AashrayRealty Team</strong></p>
          </div>
        `,
      })
    );

    await Promise.all(emails);

    console.log("✅ Emails sent successfully.");

    // ✅ Remove all users after sending notifications
    await Notification.deleteMany({ propertyId });

  } catch (error) {
    console.error("❌ Error sending notifications:", error);
  }
};


export const getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const notifications = await Notification.find({ userId, isRead: false }).sort({ createdAt: -1 });

    res.json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
