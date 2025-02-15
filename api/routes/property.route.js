import express from 'express';
import upload from "../multer.js";
import { addProperty, allProperty, deleteImage, uploadImage } from '../controller/property.controller.js';
const router=express.Router();


router.post("/upload", upload.array("images"),uploadImage);
router.delete("/delete",deleteImage);
router.post('/add',addProperty);
router.get('/all',allProperty);
export default router;