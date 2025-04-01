import mongoose from "mongoose";

const RentingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
    rentStartDate: { type: Date, required: true },
    rentEndDate: { type: Date, required: true },
    rentAmount: { type: Number, required: true },
    dueDate: { type: Date, required: true }, // Monthly rent due date
    lastPaymentDate: { type: Date }, // Stores the last rent payment date
    paymentHistory: [{ paymentId: String, date: Date }], 
    
});

export default mongoose.model("Renting", RentingSchema);
