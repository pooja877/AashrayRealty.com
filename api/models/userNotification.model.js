import mongoose from "mongoose";

const userNotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false, // Initially false, updates to true when the user reads
    },
  },
  { timestamps: true }
);

const UserNotification = mongoose.model("UserNotification", userNotificationSchema);
export default UserNotification;
