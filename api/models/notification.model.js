import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Property" },
  email: { type: String, required: true },
});

export const Notification = mongoose.model("Notification", notificationSchema);
