import cron from "node-cron";
import Property from "../models/property.model.js"; 
import Booking from "../models/booking.model.js"; 
import nodemailer from "nodemailer";

// ✅ Function to check and update expired bookings
const checkExpiredBookings = async () => {
  try {
    const currentDate = new Date();

    // 🔹 Find expired bookings that are still "Booked"
    const expiredBookings = await Booking.find({
      status: "Booked",
      expiresAt: { $lt: currentDate }, // Bookings that have passed the expiry date
    });

    for (const booking of expiredBookings) {
      const { _id, propertyId, email } = booking;

      // 🔹 Mark Property as Available Again
      await Property.findByIdAndUpdate(propertyId, { status: "Available" });

      // 🔹 Update Booking Status to Expired
      booking.status = "Expired";
      booking.expiredAt = currentDate;
      await booking.save();

      // 🔹 Send Expiry Notification Email
      sendExpiryEmail(email, _id, propertyId);
    }

    console.log(`✔️ Checked expired bookings: ${expiredBookings.length} updated.`);
  } catch (error) {
    console.error("Error in checking expired bookings:", error);
  }
};

// 🔹 Run this function every day at midnight (12 AM)
cron.schedule("0 0 * * *", async () => {
  console.log("🔄 Running expired bookings check...");
  await checkExpiredBookings();
});

// ✅ Function to send email notification for expired bookings
const sendExpiryEmail = async (email, bookingId, propertyId) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Aashray Realty - Booking Expired",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #d9534f;">Your Booking Has Expired</h2>
        <p>Dear Customer,</p>
        <p>Your booking for property ID <strong>${propertyId}</strong> has expired as you did not visit the property within 10 days.</p>
        <p>The property is now available for booking again.</p>
        <p>Best Regards,<br><strong>Aashray Realty Team</strong></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Expiry email sent to ${email}`);
  } catch (error) {
    console.error("Error sending expiry email:", error);
  }
};

export default checkExpiredBookings;
