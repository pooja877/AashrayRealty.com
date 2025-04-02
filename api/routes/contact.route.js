import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { getMessages, replyMessage,deleteAllMessages,getUnreadNotificationsCount, sendMessage,getUnansweredMessages,deleteMessage, deleteNotificationsByCategory, getMessagesByCategory, markNotificationsAsRead } from "../controller/contact.controller.js";

const router = express.Router();

router.post("/", verifyToken, sendMessage); // User must be logged in to send message
router.get("/getmessage", verifyToken, getMessages); // Only admin should access this (check in frontend)
router.post("/reply", replyMessage); // Admin replies
router.get("/unanswered", verifyToken, getUnansweredMessages);
router.delete("/delete/:id", deleteMessage);
router.delete('/deleteAll/:category', deleteAllMessages);
router.get("/category/:category", getMessagesByCategory);

router.get("/unread-notifications", getUnreadNotificationsCount);
router.delete("/delete/:category", deleteNotificationsByCategory);
router.post("/mark-notifications-read", markNotificationsAsRead);


export default router;
