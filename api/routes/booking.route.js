
import express from "express";
import { cancelBooking, confirmBooking, createOrder, getAllBookings ,deleteBooking,markRented, markAsRented} from "../controller/booking.controller.js";

const router = express.Router();

router.post("/create", createOrder);  // Create Razorpay Order
router.post("/confirm", confirmBooking);  // Confirm Booking & Send Email
router.post("/cancel", cancelBooking);  
router.get("/all", getAllBookings);
router.delete("/delete/:id", deleteBooking);
router.patch("/rented/:id", markAsRented);
router.patch("/rentedfalse/:id", markRented);
export default router;
