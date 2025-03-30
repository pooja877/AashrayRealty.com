
import express from "express";
import { cancelBooking, confirmBooking, createOrder, getBookingDetails } from "../controller/booking.controller.js";

const router = express.Router();

router.post("/create", createOrder);  // Create Razorpay Order
router.post("/confirm", confirmBooking);  // Confirm Booking & Send Email
router.post("/cancel", cancelBooking);  
router.get("/", getBookingDetails);
export default router;
