import Review from "../models/Review.model.js";
// import User from "../models/User.model.js";

export const getReviews = async (req, res) => {
    try {
      const { propertyId } = req.params;
  
      if (!propertyId) {
        return res.status(400).json({ message: "Property ID is required" });
      }
  
      // Fetch all reviews with user details
      const reviews = await Review.find({ propertyId }).populate("userId", "username avatar");
  
      // Calculate average rating
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;
  
      res.status(200).json({ reviews, averageRating });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };



  export const addReview = async (req, res) => {
    try {
      const { propertyId, userId, rating, comment } = req.body;
  
      if (!propertyId || !userId || !rating || !comment) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Check if user already reviewed this property
      let existingReview = await Review.findOne({ propertyId, userId });
  
      if (existingReview) {
        // Update existing review
        existingReview.rating = rating;
        existingReview.comment = comment;
        await existingReview.save();
        return res.status(200).json({ message: "Review updated successfully", review: existingReview });
      }
  
      // Create new review if no existing one
      const newReview = new Review({ propertyId, userId, rating, comment });
      await newReview.save();
  
      res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };