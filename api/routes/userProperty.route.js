import express from "express";
import {  addProperty, deleteProperty,getPropertyById,updateProperty,getUserProperties, getAllProperties, getApprovedProperties, getPropertyStats, togglePropertyStatus, deleteImage, getSingleProperty, getUserlistings } from "../controller/userProperty.controller.js";
import { verifyToken } from '../utils/verifyUser.js'; 

const router = express.Router();

router.post('/addPro', addProperty);
router.get("/getAll", getAllProperties); 
// router.put("/activate/:id", activateProperty);
router.get("/stats", getPropertyStats);
router.get("/getuser/:userId", getUserProperties);
router.put("/update/:id", updateProperty);

router.delete("/delete",deleteImage);
router.get("/listed", verifyToken, getUserlistings);

router.put("/togglestatus/:id", togglePropertyStatus);
router.delete("/delete/:id", deleteProperty);

router.get("/approved", getApprovedProperties); 
router.get("/getmapSingle/:id", getSingleProperty);
router.get("/pro/:id", getPropertyById);

export default router;
