import express from "express";
import { deleteNotification, getNotifications,getUnreadNotifications,markNotificationsAsRead,deleteAllNotifications } from "../controller/userNotification.controller.js";

import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// 1️⃣ Fetch all notifications for a user
router.get("/:id", verifyToken, getNotifications);


router.delete("/:notificationId",verifyToken, deleteNotification);

router.get("/unread/:userId", getUnreadNotifications);

// Mark notifications as read
router.post("/mark-read/:userId", markNotificationsAsRead);
router.delete("/", deleteAllNotifications);

export default router;
