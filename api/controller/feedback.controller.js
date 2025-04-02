import Contact from "../models/contact.model.js";
import Feedback from "../models/feedback.model.js";
import UserNotification from "../models/userNotification.model.js";
export const addFeedback = async (req, res) => {
  try {
    const { rating, comments } = req.body;
    const newFeedback = new Feedback({
      userId: req.user.id,
      rating,
      comments,
    });
    await newFeedback.save();
    const newNotification = new UserNotification({
          userId:req.user.id,
          message: `Your Feedback send Successfully!!`,
        });
        await newNotification.save();

        await Contact.create({
          userId,
          category: "feedback",
          message: ` ${userId.username} gives feedback!!`,
        });
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
