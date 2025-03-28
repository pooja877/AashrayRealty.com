import { razorpay } from "../razorpay.js";
import crypto from "crypto";
import dotenv from "dotenv";
import Booking from "../models/booking.model.js";
import nodemailer from "nodemailer";

dotenv.config();

// 1️⃣ Create Razorpay Order
export const createOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const options = { amount: amount * 100, currency, payment_capture: 1 };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Order creation failed" });
  }
};

// 2️⃣ Confirm Booking after Payment
export const confirmBooking = async (req, res) => {
  try {
    const { userId, propertyId, paymentId, orderId, signature, email } = req.body;

    // Verify Razorpay Signature
    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    // Save Booking in MongoDB
    const newBooking = new Booking({ userId, propertyId, paymentId, orderId, signature });
    await newBooking.save();

    // Send Confirmation Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Booking Confirmed - AashrayRealty",
      text: `Your property booking is confirmed.\n\nPayment ID: ${paymentId}\nOrder ID: ${orderId}`,
    };

    transporter.sendMail(mailOptions);

    res.json({ message: "Booking confirmed successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Booking confirmation failed" });
  }
};
