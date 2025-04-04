import mongoose from "mongoose";

const UserPropertySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    bhk: { type: String, required: true },  // Example: "2 BHK"
    price: { type: Number, required: true },
        city: { type: String,required: true },
        area: { type: String, required: true },
        pincode: { type: String, required: true },
        address:{type:String,require:true},
        images: [{ type: String, required: true }],
         desc:{type:String,required:true},
         floor:{type:String,required:false},
    amenities: { type: String, required: true },
    transactionType: { type: String, required: true },
    propertyType: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Approved"], default: "Pending" },
}, { timestamps: true });

export default mongoose.model("UserProperty", UserPropertySchema);
