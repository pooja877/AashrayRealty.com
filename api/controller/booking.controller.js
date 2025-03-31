import { razorpay } from "../razorpay.js";
import crypto from "crypto";
import dotenv from "dotenv";
import Property from "../models/property.model.js"; 
import User from "../models/user.model.js";
import Booking from "../models/booking.model.js"; 
import Renting from "../models/renting.model.js";
import nodemailer from "nodemailer";
import { notifyInterestedUsers } from "./notification.controller.js";

dotenv.config();

export const getBookingDetails = async (req, res) => {
  try {
    const { userId, propertyId } = req.query;

    if (!userId || !propertyId) {
      return res.status(400).json({ message: "Missing userId or propertyId" });
    }

    // 🔹 Find the booking for the given user and property
    const booking = await Booking.findOne({ userId, propertyId });

    if (!booking) {
      return res.status(404).json({ message: "No booking found" });
    }

    res.status(200).json({ booking });
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const confirmBooking = async (req, res) => {
  try {
    const { userId, propertyId, paymentId, orderId, signature, email, amount,transactionType } = req.body; // 🔹 Get Amount

    // 🔹 Verify Razorpay Signature
    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_TEST_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    // 🔹 Save Booking with Token Amount
    const newBooking = new Booking({
      userId,
      propertyId,
      paymentId,
      orderId,
      signature,
      tokenAmount: amount, // ✅ Store Token Amount
      status: "Confirmed",
      transactionType,
      expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // ✅ Expires in 10 days
    });

    await newBooking.save();
    await Property.findByIdAndUpdate(propertyId, { status: "Booked" });
    // 🔹 Send Confirmation Email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const sendamount=amount/100;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "🎉 Booking Confirmation - AashrayRealty",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #2d89ef;">Your Property Booking is Confirmed! 🎉</h2>
          <p>Your booking has been confirmed with a token amount of ₹${sendamount}.</p>
          <p><strong>Payment ID:</strong> ${paymentId}</p>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Property ID:</strong> ${propertyId}</p>
          <p>✔️ You can visit the property within the next <strong>10 days</strong>.</p>
          <p>✔️ If you cancel within this period, you will receive a <strong>50% refund</strong>.</p>
          <p>❌ If you do not visit, the booking will expire.</p>
          <p>Best Regards,<br><strong>AashrayRealty Team</strong></p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email Error:", error);
        return res.status(500).json({ message: "Email sending failed" });
      }
      // console.log("Email Sent:", info.response);
      res.json({ message: "Booking confirmed, token amount saved, and email sent!" });
    });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Booking confirmation failed" });
  }
};

// 🔹 Create Order for Payment
export const createOrder = async (req, res) => {
  try {
    let { amount, currency } = req.body;

    if (!amount || !currency) {
      return res.status(400).json({ message: "Amount and currency are required" });
    }

    const options = { amount, currency, payment_capture: 1 };
    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({ message: "Order creation failed" });
  }
};


export const cancelBooking = async (req, res) => {
  try {
    const { bookingId, propertyId, userId, email,status } = req.body;

    if (!bookingId || !propertyId || !userId || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Fetch Booking Details
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.status === "Cancelled") {
      return res.status(400).json({ message: "Booking already cancelled" });
    }

    // Check Expiry Date
    const currentDate = new Date();
    const isExpired = currentDate > booking.expiresAt;

    if (isExpired) {
      // Booking expired → No refund, mark property as available
      booking.status = "Expired";
      await booking.save();
      await Property.findByIdAndUpdate(propertyId, { status: "Available" });

      return res.json({ message: "Booking expired. Property is now available again. No refund issued." });
    }

    // Booking is still valid → Process 50% refund
    if (!booking.paymentId || !booking.tokenAmount) {
      return res.status(400).json({ message: "Invalid booking data: Missing payment or amount" });
    }

    // Fetch Payment Details from Razorpay
    const paymentDetails = await razorpay.payments.fetch(booking.paymentId);
    if (!paymentDetails.captured) {
      return res.status(400).json({ message: "Payment not captured. Refund not possible." });
    }

    const capturedAmount = paymentDetails.amount; // Captured amount in paise
    const refundAmount = Math.min(Math.round(booking.tokenAmount / 2), capturedAmount); // 50% refund

    // Process Refund
    const refund = await razorpay.payments.refund(booking.paymentId, { amount: refundAmount });

    if (!refund) {
      return res.status(500).json({ message: "Refund processing failed" });
    }

    // Update Booking Status
    booking.status = "Cancelled";
    booking.cancelledAt = new Date();
    booking.refundAmount = refundAmount / 100; // Convert back to INR
    booking.refundId = refund.id;
    await booking.save();

    // Mark Property as Available Again
    // await Property.findByIdAndUpdate(propertyId, { status: "Available" });
    
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId, 
      { status: "Available" }, 
      { new: true } // Returns the updated property
    );

    if (updatedProperty.status === "Available") {
      await notifyInterestedUsers(propertyId); // Call notification only after update
    }
    // Send Refund Confirmation Email
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
      subject: "AashrayRealty - Your Booking Cancelled & Refund Processed",
      html: ` 
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #d9534f;">Your Booking Has Been Cancelled</h2>
          <p>Dear Customer,</p>
          <p>Your booking has been successfully cancelled. A refund of <strong>₹${(booking.refundAmount).toFixed(2)}</strong> has been processed to your original payment method.</p>
          <h3>Refund Details:</h3>
          <ul>
            <li><strong>Booking ID:</strong> ${bookingId}</li>
            <li><strong>Refund Amount:</strong> ₹${(booking.refundAmount).toFixed(2)}</li>
            <li><strong>Refund ID:</strong> ${refund.id}</li>
            <li><strong>Payment ID:</strong> ${booking.paymentId}</li>
          </ul>
          <p>✔️ The amount will be credited to your bank account within 5-7 working days after the refund has been processed.</p>
          <p>For any queries, please contact our support team.</p>
          <p>Best Regards,<br><strong>AashrayRealty Team</strong></p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email Sending Error:", error);
        return res.status(500).json({ message: "Refund successful, but email sending failed" });
      }
      res.json({ message: "Booking cancelled & 50% refund processed! Email sent successfully." });
    });
    
      
    

  } catch (error) {
    console.error("Cancellation Error:", error);
    res.status(500).json({ message: "Cancellation failed" });
  }
};

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Bookings", error });
    }
};
export const deleteBooking = async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete Booking" });
    }
};

export const markAsRented = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.isRented) {
      return res.status(400).json({ message: "Property is already rented" });
    }

    const property = await Property.findById(booking.propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const user = await User.findById(booking.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const amount=property.discountPrice ? property.discountPrice : property.price;
    // Rent start & end dates (12 months lease)
    const rentStartDate = new Date();
    const rentEndDate = new Date();
    rentEndDate.setFullYear(rentEndDate.getFullYear() + 1);
    const dueDate = new Date(rentStartDate.getTime() + 5 * 60000);
    // const dueDate = new Date(rentStartDate);
    // dueDate.setMonth(dueDate.getMonth() + 1);
    
    // Save in Renting collection
    const renting = new Renting({
      userId: booking.userId,
      propertyId: booking.propertyId,
      rentStartDate,
      rentEndDate,
      dueDate,
      rentAmount:amount 
    });

    await renting.save();

    // Update Booking status to "Rented" and isRented to true
    booking.isRented = true;
    await booking.save();

    // Send email to user
    await sendRentedEmail(user.email, property);

    res.json({ message: "Property marked as rented and user notified via email" });
  } catch (error) {
    console.error("Error marking as rented:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to send email to user
const sendRentedEmail = async (userEmail, property) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Fetched from .env
      pass: process.env.EMAIL_PASS, // Fetched from .env
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "🏡 Property Rental Confirmation - AashrayRealty",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #007bff; text-align: center;">🏡 Property Rental Confirmation</h2>
        <p>Dear Customer,</p>
        
        <p>We are pleased to inform you that your rental for the property <strong>${property.propertyName}</strong> has been successfully confirmed.</p>
        
        <hr style="border: 0; height: 1px; background: #ddd; margin: 15px 0;">
        
        <h3 style="color: #007bff;">Rental Details:</h3>
        <p><strong>Property:</strong> ${property.propertyName}</p>
        <p><strong>Location:</strong> ${property.address}${property.area}${property.city}</p>
        <p><strong>Rent Duration:</strong> 12 Months</p>
        <p><strong>Monthly Rent:</strong> 
          ₹${property.discountPrice ? property.discountPrice : property.price} 
          ${property.discountPrice ? `<span style="color: #777; text-decoration: line-through;">₹${property.price}</span>` : ""}
        </p>
        <p><strong>Start Date:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Next Payment Due Date:</strong> ${new Date(new Date().setMonth(new Date().getMonth()+1)).toLocaleDateString()}</p>
        
        <hr style="border: 0; height: 1px; background: #ddd; margin: 15px 0;">
        
        <p>Thank you for choosing <strong>AashrayRealty</strong>. If you have any questions, feel free to contact our support team.</p>
        
        <p>Best Regards,</p>
        <p><strong>AashrayRealty Team</strong></p>
        <p style="font-size: 12px; color: #777;">This is an automated email. Please do not reply.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    // console.log("Email sent to user:", userEmail);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
export const markRented = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (!booking.isRented) {
      return res.status(400).json({ message: "Property is already rented false" });
    }

    const property = await Property.findById(booking.propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const user = await User.findById(booking.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    booking.isRented = false;
    await booking.save();


    res.json({ message: "Property marked as rented and user notified via email" });
  } catch (error) {
    console.error("Error marking as rented:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

