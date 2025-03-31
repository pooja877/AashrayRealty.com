import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Property" },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, // ✅ User ID for tracking
  email: { type: String, required: true },
  message: { type: String, required: true }, // ✅ Notification message
  isRead: { type: Boolean, default: false }, // ✅ Track read/unread notifications
  createdAt: { type: Date, default: Date.now }
},{ timestamps: true });

export const Notification = mongoose.model("Notification", notificationSchema);
