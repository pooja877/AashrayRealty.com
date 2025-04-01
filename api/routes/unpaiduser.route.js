import express from "express";
import { deleteUnpaidUser, getAllUnpaidUsers, sendPaymentReminderAPI } from "../controller/unpaiduser.controller.js";


const router = express.Router();
router.post("/send-reminder/:userId", sendPaymentReminderAPI);
router.get("/unpaid-users", getAllUnpaidUsers);

router.delete("/unpaiduser/:userId", deleteUnpaidUser);


export default router;
