
import express from "express";
import { cancelBooking, confirmBooking, createOrder, getAllBookings ,deleteBooking} from "../controller/booking.controller.js";

const router = express.Router();

router.post("/create", createOrder);  // Create Razorpay Order
router.post("/confirm", confirmBooking);  // Confirm Booking & Send Email
router.post("/cancel", cancelBooking);  
router.get("/all", getAllBookings);
router.delete("/delete/:id", deleteBooking);
export default router;
