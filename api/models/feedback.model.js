import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  // userId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
  comments: { type: String, required: true },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
