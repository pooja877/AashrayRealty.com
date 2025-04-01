import express from 'express';
import { deleteRenting, getAllRentings, getUserRentings, razorpayCallback } from '../controller/renting.controller.js';

import { verifyToken } from '../utils/verifyUser.js'; 
const router = express.Router();

router.get("/callback", razorpayCallback);
router.get("/rented", verifyToken, getUserRentings);
router.get("/all", getAllRentings);
router.delete("/delete/:id", deleteRenting);


export default router;
