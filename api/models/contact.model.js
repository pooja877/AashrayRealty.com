import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    replied: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", ContactSchema);
