import express from "express";
import { getLikedProperties, likeProperty, unlikeProperty } from "../controller/liked.controller.js";
import { verifyToken } from '../utils/verifyUser.js'; 

const router = express.Router();


router.post("/like", verifyToken, likeProperty);
router.post("/unlike", verifyToken, unlikeProperty); 
router.get("/liked", verifyToken, getLikedProperties);

export default router;
