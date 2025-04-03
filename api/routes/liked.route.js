
import express from "express";
import { 
    getLikedProperties, 
    likeProperty, 
    unlikeProperty 
} from "../controller/liked.controller.js";
import { verifyToken } from '../utils/verifyUser.js'; 

const router = express.Router();

// ✅ Like a property (Regular or User Property)
router.post("/like", verifyToken, likeProperty);

// ❌ Unlike a property
router.post("/unlike", verifyToken, unlikeProperty);

// 🔍 Get all liked properties of the user
router.get("/liked", verifyToken, getLikedProperties);

export default router;
