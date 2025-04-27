
import express from "express";
import { cancelBooking, confirmBooking, createOrder, getAllBookings ,deleteBooking,markRented, markAsRented, getUserBookings, getMonthlyBookingStats} from "../controller/booking.controller.js";

import { verifyToken } from '../utils/verifyUser.js'; 
const router = express.Router();

router.post("/create", createOrder);  // Create Razorpay Order
router.post("/confirm", confirmBooking);  // Confirm Booking & Send Email
router.post("/cancel", cancelBooking);  
router.get("/all", getAllBookings);
router.delete("/delete/:id", deleteBooking);
router.patch("/rented/:id", markAsRented);
router.patch("/rentedfalse/:id", markRented);
router.get("/booked", verifyToken, getUserBookings);

router.get("/monthly-bookings", getMonthlyBookingStats);
// router.get("/", getSingleBooking);
export default router;
