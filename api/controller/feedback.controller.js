import Contact from "../models/contact.model.js";
import Feedback from "../models/feedback.model.js";
import User from "../models/user.model.js";
import UserNotification from "../models/userNotification.model.js";
export const addFeedback = async (req, res) => {
  try {
    const { rating, comments,userId } = req.body;
    const newFeedback = new Feedback({
      userId,
      rating,
      comments,
    });
    await newFeedback.save();
    const newNotification = new UserNotification({
          userId,
          message: `Your Feedback send Successfully!!`,
        });
        await newNotification.save();
        const user = await User.findById(userId); // Fetch logged-in user

        await Contact.create({
          userId,
          category: "feedback",
          message: ` ${user.username} gives feedback!!`,
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
