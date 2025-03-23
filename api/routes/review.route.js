import express from "express";
import { addReview ,getReviews} from "../controller/review.controller.js";

const router = express.Router();
router.post("/add",addReview);
router.get("/:propertyId", getReviews);

export default router;
