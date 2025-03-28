import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who booked
  propertyId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Property being booked
  paymentId: { type: String, required: true }, // Razorpay Payment ID
  orderId: { type: String, required: true }, // Razorpay Order ID
  signature: { type: String, required: true }, // Razorpay Signature
  status: { type: String, default: "Booked" }, // Booking status (Booked, Canceled)
  bookedAt: { type: Date, default: Date.now }, // Booking date
});

export default mongoose.model("Booking", BookingSchema);
