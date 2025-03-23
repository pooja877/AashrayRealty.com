import Feedback from "../models/feedback.model.js";
export const addFeedback = async (req, res) => {
  try {
    const { rating, comments } = req.body;
    const newFeedback = new Feedback({
      userId: req.user.id,
      rating,
      comments,
    });

    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting feedback" });
  }
};

export const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find().populate("userId", "username avatar");

    res.status(200).json(feedback);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Error fetching feedback" });
  }
};
