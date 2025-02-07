import express from 'express';
import multer from 'multer';
import { addProperty, uploadImage } from '../controller/property.controller.js';
const router=express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.array("images"),uploadImage)
router.post('/add',addProperty);
export default router;