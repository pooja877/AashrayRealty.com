import express from "express";
import { getLikedProperties, likeProperty, unlikeProperty } from "../controller/liked.controller.js";
import { verifyToken } from '../utils/verifyUser.js'; // Import verifyToken middleware

const router = express.Router();

// ✅ Property Like Route
router.post("/like", verifyToken, likeProperty);

// ❌ Property Unlike Route
router.post("/unlike", verifyToken, unlikeProperty); // Changed from DELETE to POST

// 🔍 Get All Liked Properties of a User (No need for userId in URL)
router.get("/liked", verifyToken, getLikedProperties);

export default router;
