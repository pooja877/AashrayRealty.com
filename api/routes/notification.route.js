import express from "express";
import { addInterestedUser, getUserNotifications } from "../controller/notification.controller.js";

const router = express.Router();

router.post("/notify-me", addInterestedUser);
router.get("/:userId", getUserNotifications); // ✅ Fetch unread notifications


export default router;
