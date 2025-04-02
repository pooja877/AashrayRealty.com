import mongoose from "mongoose";

const UserPropertySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    bhk: { type: String, required: true },  // Example: "2 BHK"
    price: { type: Number, required: true },
    location: {
        city: { type: String, enum: ["Ahmedabad", "Gandhinagar"], required: true },
        area: { type: String, required: true },
        pincode: { type: String, required: true }
    },
    images: { type: [String], required: true },
    amenities: { type: [String], required: true },
    propertyType: { type: String, enum: ["Rent", "Sale"], required: true },
    status: { type: String, enum: ["Pending", "Approved"], default: "Pending" },
}, { timestamps: true });

export default mongoose.model("UserProperty", UserPropertySchema);
