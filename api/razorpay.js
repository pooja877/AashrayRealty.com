import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_TEST_KEY_ID, // Test Key ID
  key_secret: process.env.RAZORPAY_TEST_SECRET, // Test Secret Key
});
