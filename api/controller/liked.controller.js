import { Like } from "../models/liked.model.js";

// ✅ Property Like
export const likeProperty = async (req, res) => {
    const { userId, propertyId } = req.body;

    try {
      const existingLike = await Like.findOne({ userId, propertyId });
  
      if (existingLike) {
        await Like.deleteOne({ _id: existingLike._id });
        return res.status(200).json({ message: "Property unliked" });
      }
  
      const newLike = new Like({ userId, propertyId });
      await newLike.save();
  
      res.status(201).json({ message: "Property liked" });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
};

// ❌ Property Unlike
export const unlikeProperty = async (req, res) => {
    try {
        const userId = req.user.id; // Extract userId from token
        const { propertyId } = req.body;

        await Like.deleteOne({ userId, propertyId });
        res.status(200).json({ message: "Property Unliked" });
    } catch (error) {
        res.status(500).json({ message: "Error Unliking Property" });
    }
};

// 🔍 Get All Liked Properties of a User
export const getLikedProperties = async (req, res) => {
    try {
        const likes = await Like.find({ userId: req.params.userId }).select("propertyId");
        res.json(likes);
      } catch (error) {
        res.status(500).json({ error: "Server error" });
      }
};
