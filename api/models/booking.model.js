import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true }, 
  transactionType: {
    type: String, // Example: "Sale", "Rent"
    required: true
 },
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
  refundId: { type: String }, 
  isRented: { 
    type: Boolean, 
    default: false  // Default is false, meaning it's not rented initially
  },
 
},
{ timestamps: true });

export default mongoose.model("Booking", BookingSchema);
