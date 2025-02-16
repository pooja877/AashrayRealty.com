import express from 'express';
import upload from "../multer.js";
import { addProperty, allProperty,  deleteImage, deleteProperty, getAllProperties, getPropertyById, updateProperty, uploadImage } from '../controller/property.controller.js';
const router=express.Router();


router.post("/upload", upload.array("images"),uploadImage);
router.delete("/delete",deleteImage);
router.post('/add',addProperty);
router.get('/getall',getAllProperties);
router.get('/all',allProperty);
router.get("/:id", getPropertyById);
router.delete('/deleteProperty/:id',deleteProperty);
router.put('/updateProperty/:id',updateProperty);
export default router;