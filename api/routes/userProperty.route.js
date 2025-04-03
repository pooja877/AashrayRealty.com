import express from "express";
import {  addProperty, deleteProperty,updateProperty,getUserProperties, getAllProperties, getApprovedProperties, getPropertyStats, togglePropertyStatus, deleteImage } from "../controller/userProperty.controller.js";


const router = express.Router();

router.post('/addPro', addProperty);
router.get("/getAll", getAllProperties); 
// router.put("/activate/:id", activateProperty);
router.get("/stats", getPropertyStats);
router.get("/getuser/:userId", getUserProperties);
router.get("/update/:id", updateProperty);
router.delete("/delete",deleteImage);

router.put("/toggle-status/:id", togglePropertyStatus);
router.delete("/delete/:id", deleteProperty);

router.get("/approved", getApprovedProperties); 

export default router;
