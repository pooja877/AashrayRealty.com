// import { Like } from "../models/liked.model.js";

// export const likeProperty = async (req, res) => {
//   try {
//       const { propertyId } = req.body;
//       const userId = req.user.id;

//       const existingLike = await Like.findOne({ userId, propertyId });
//       if (existingLike) return res.status(400).json({ message: "Property already liked" });

//       await new Like({ userId, propertyId }).save();
//       res.status(201).json({ message: "Property liked successfully" });
//   } catch (error) {
//       res.status(500).json({ message: "Error liking property", error });
//   }
// };

// export const likeuserProperty = async (req, res) => {
//   try {
//       const { proId } = req.body;
//       const userId = req.user.id;

//       const existingLike = await Like.findOne({ userId, proId });
//       if (existingLike) return res.status(400).json({ message: "Property already liked" });

//       await new Like({ userId, proId }).save();
//       res.status(201).json({ message: "Property liked successfully" });
//   } catch (error) {
//       res.status(500).json({ message: "Error liking property", error });
//   }
// };


// // ❌ Unlike a Property
// export const unlikeProperty = async (req, res) => {
//   try {
//       const { propertyId } = req.body;
//       const userId = req.user.id;

//       const deletedLike = await Like.findOneAndDelete({ userId, propertyId });

//       if (!deletedLike) return res.status(400).json({ message: "Like not found" });

//       res.status(200).json({ message: "Like removed successfully" });
//   } catch (error) {
//       res.status(500).json({ message: "Error unliking property", error });
//   }
// };
// export const unlikeuserProperty = async (req, res) => {
//   try {
//       const { proId } = req.body;
//       const userId = req.user.id;

//       const deletedLike = await Like.findOneAndDelete({ userId, proId });

//       if (!deletedLike) return res.status(400).json({ message: "Like not found" });

//       res.status(200).json({ message: "Like removed successfully" });
//   } catch (error) {
//       res.status(500).json({ message: "Error unliking property", error });
//   }
// };

// // 🔍 Get All Liked Properties of the User
// // export const getLikedProperties = async (req, res) => {
// //   try {
// //       if (!req.user) return res.status(401).json({ message: "Unauthorized" });

// //       const userId = req.user.id;
// //       const likedProperties = await Like.find({ userId }).populate("propertyId");

// //       // Remove null values if any propertyId is missing
// //       const filteredProperties = likedProperties.filter(like => like.propertyId);

// //       res.status(200).json(filteredProperties);
// //   } catch (error) {
// //       res.status(500).json({ message: "Error fetching liked properties", error });
// //   }
// // };
// export const getLikedProperties = async (req, res) => {
//   try {
//        // Debugging User ID
//       const userId = req.user?.id;

//       if (!userId) {
//           return res.status(401).json({ message: "Unauthorized, user ID missing" });
//       }

//       const likedProperties = await Like.find({ userId }).populate('propertyId');

     

//       res.status(200).json(likedProperties);
//   } catch (error) {
//       console.error("Error fetching liked properties:", error);
//       res.status(500).json({ message: "Error fetching liked properties", error });
//   }
// };

// export const getuserLikedProperties = async (req, res) => {
//   try {
//        // Debugging User ID
//       const userId = req.user?.id;

//       if (!userId) {
//           return res.status(401).json({ message: "Unauthorized, user ID missing" });
//       }

//       const likedProperties = await Like.find({ userId }).populate('proId');

     

//       res.status(200).json(likedProperties);
//   } catch (error) {
//       console.error("Error fetching liked properties:", error);
//       res.status(500).json({ message: "Error fetching liked properties", error });
//   }
// };
import { Like } from "../models/liked.model.js";
import Property from '../models/property.model.js';
import UserProperty from '../models/userProperties.model.js'
// ✅ Like a Property (Regular or User Property)
export const likeProperty = async (req, res) => {
    try {
        console.log(req.body);
        const { propertyId, propertyType } = req.body;
        const userId = req.user.id;

        if (!propertyId || !propertyType) {
            return res.status(400).json({ message: "Property ID and type are required" });
        }

        // Check if the property is already liked by this user
        const existingLike = await Like.findOne({ userId, propertyId, propertyType });
        if (existingLike) return res.status(400).json({ message: "Property already liked" });

        // Save the like
        await new Like({ userId, propertyId, propertyType }).save();
        res.status(201).json({ message: "Property liked successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error liking property", error });
    }
};

// ❌ Unlike a Property
export const unlikeProperty = async (req, res) => {
    try {
        const { propertyId, propertyType } = req.body;
        const userId = req.user.id;

        // Ensure both `propertyId` and `propertyType` are considered in deletion
        const deletedLike = await Like.findOneAndDelete({ userId, propertyId, propertyType });

        if (!deletedLike) return res.status(400).json({ message: "Like not found" });

        res.status(200).json({ message: "Like removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error unliking property", error });
    }
};

// 🔍 Get All Liked Properties of the User
// export const getLikedProperties = async (req, res) => {
//     try {
//         const userId = req.user?.id;
//         if (!userId) return res.status(401).json({ message: "Unauthorized, user ID missing" });

//         // Fetch liked properties and populate `propertyId` dynamically based on `propertyType`
//         const likedProperties = await Like.find({ userId }).populate({
//             path: "propertyId",
//             select: "title location images", // Fetch necessary fields
//         });

//         res.status(200).json(likedProperties);
//     } catch (error) {
//         console.error("Error fetching liked properties:", error);
//         res.status(500).json({ message: "Error fetching liked properties", error });
//     }
// };
export const getLikedProperties = async (req, res) => {
  try {
      const userId = req.user.id;
      const likedData = await Like.find({ userId });

      const likedProperties = await Promise.all(likedData.map(async (like) => {
          let property = await Property.findById(like.propertyId);
          if (!property) {
              property = await UserProperty.findById(like.propertyId);
              if (property) {
                  return { propertyId: property, propertyType: "UserProperty" };
              }
          }
          return property ? { propertyId: property, propertyType: "Property" } : null;
      }));

      res.json(likedProperties.filter(item => item !== null));
  } catch (error) {
      console.error("Error fetching liked properties:", error);
      res.status(500).json({ message: "Server error" });
  }
};