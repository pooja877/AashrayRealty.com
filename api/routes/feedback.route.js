import express from "express";
import { getFeedback, addFeedback } from "../controller/feedback.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/feed", verifyToken, addFeedback);
router.get("/get", getFeedback);

export default router;
