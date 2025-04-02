import express from "express";
import { approveProperty, createUserProperty, deleteProperty, getAllProperties, getUserProperties } from "../controller/userProperty.controller.js";


const router = express.Router();

// User submits a property
router.post("/", createUserProperty);

// Admin gets all properties
router.get("/", getAllProperties);

// Get properties by user ID
router.get("/:userId", getUserProperties);

// Admin approves a property
router.put("/approve/:id", approveProperty);

// Delete property
router.delete("/:id", deleteProperty);

export default router;
