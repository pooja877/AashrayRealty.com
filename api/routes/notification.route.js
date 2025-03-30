import express from "express";
import { addInterestedUser } from "../controller/notification.controller.js";

const router = express.Router();

router.post("/notify-me", addInterestedUser);

export default router;
