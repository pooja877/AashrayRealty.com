import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { getMessages, replyMessage, sendMessage,getUnansweredMessages } from "../controller/contact.controller.js";

const router = express.Router();

router.post("/", verifyToken, sendMessage); // User must be logged in to send message
router.get("/getmessage", verifyToken, getMessages); // Only admin should access this (check in frontend)
router.post("/reply", verifyToken, replyMessage); // Admin replies
router.get("/unanswered", verifyToken, getUnansweredMessages);
export default router;
