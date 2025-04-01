import express from 'express';
import { razorpayCallback } from '../controller/renting.controller.js';


const router = express.Router();

router.get("/callback", razorpayCallback);

export default router;
