import express from 'express';
import upload from "../multer.js";
import { addProperty, uploadImage } from '../controller/property.controller.js';
const router=express.Router();


router.post("/upload", upload.array("images"),uploadImage)
router.post('/add',addProperty);
export default router;