import { Like } from "../models/liked.model.js";

export const likeProperty = async (req, res) => {
  try {
      const { propertyId } = req.body;
      const userId = req.user.id;

      const existingLike = await Like.findOne({ userId, propertyId });
      if (existingLike) return res.status(400).json({ message: "Property already liked" });

      await new Like({ userId, propertyId }).save();
      res.status(201).json({ message: "Property liked successfully" });
  } catch (error) {
      res.status(500).json({ message: "Error liking property", error });
  }
};


// ❌ Unlike a Property
export const unlikeProperty = async (req, res) => {
  try {
      const { propertyId } = req.body;
      const userId = req.user.id;

      const deletedLike = await Like.findOneAndDelete({ userId, propertyId });

      if (!deletedLike) return res.status(400).json({ message: "Like not found" });

      res.status(200).json({ message: "Like removed successfully" });
  } catch (error) {
      res.status(500).json({ message: "Error unliking property", error });
  }
};

// 🔍 Get All Liked Properties of the User
// export const getLikedProperties = async (req, res) => {
//   try {
//       if (!req.user) return res.status(401).json({ message: "Unauthorized" });

//       const userId = req.user.id;
//       const likedProperties = await Like.find({ userId }).populate("propertyId");

//       // Remove null values if any propertyId is missing
//       const filteredProperties = likedProperties.filter(like => like.propertyId);

//       res.status(200).json(filteredProperties);
//   } catch (error) {
//       res.status(500).json({ message: "Error fetching liked properties", error });
//   }
// };
export const getLikedProperties = async (req, res) => {
  try {
      const userId = req.user.id; // `verifyUser` middleware se user ID mil jayegi

      const likedProperties = await Like.find({ userId }).populate('propertyId');

      res.status(200).json(likedProperties);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching liked properties', error });
  }
};

