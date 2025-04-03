import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, refPath: "propertyType" }, // Can be either Property or UserProperty
    propertyType: { type: String, enum: ["Property", "UserProperty"], required: true }, // Differentiates property types
}, { timestamps: true });

export const Like = mongoose.model("Like", likeSchema);
