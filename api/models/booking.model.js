import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true }, 
  paymentId: { type: String, required: true }, 
  orderId: { type: String, required: true }, 
  signature: { type: String, required: true }, 
  tokenAmount: { type: Number, required: true },  // 🔹 Add Token Amount (Booking Fee)
  status: { 
    type: String, 
    enum: ["Pending", "Confirmed", "Cancelled", "Expired"], 
    default: "Pending" 
  }, 
  bookedAt: { type: Date, default: Date.now }, 
  cancelledAt: { type: Date }, 
  expiresAt: { type: Date }, // Auto-expiry date after 10 days
  refundAmount: { type: Number }, // 🔹 Store Refund Amount if Cancelled
  refundId: { type: String }, // 🔹 Store Refund ID from Razorpay
  notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("Booking", BookingSchema);
