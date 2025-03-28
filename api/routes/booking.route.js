import express from "express";
import { confirmBooking, createOrder } from "../controller/booking.controller.js";


const router = express.Router();

router.post("/create", createOrder);  // Create Razorpay Order
router.post("/confirm", confirmBooking); 

export default router;
