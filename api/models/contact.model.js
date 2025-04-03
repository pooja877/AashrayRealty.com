
import mongoose from "mongoose";

const categoryEnum = [
  "book",
  "unpaid",
  "rentpaid",
  "feedback",
  "cancle",
  "contact",
  "newUser",
  "clickNotify",
  "userUploadProperty"
];

const ContactSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    category: { type: String, enum: categoryEnum, required: true },  // Using predefined categories
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    replied: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", ContactSchema);
