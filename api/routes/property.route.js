import express from 'express';
import upload from "../multer.js";
import { addProperty, allProperty, deleteImage,getTopRatedProperties, deleteProperty, getAllProperties, getPropertyById,getSingleProperty, updateProperty, uploadImage, getTopRatedPropertiesByArea } from '../controller/property.controller.js';

const router=express.Router();

router.get("/top-rated", getTopRatedProperties);
router.get('/top-rated-area', getTopRatedPropertiesByArea);

router.post("/upload", upload.array("images"),uploadImage);
router.delete("/delete",deleteImage);
router.post('/add',addProperty);
router.get('/getallmap',getAllProperties);
router.get("/getmapSingle/:id", getSingleProperty);
router.get('/all',allProperty);
router.get("/:id", getPropertyById);
router.delete('/deleteProperty/:id',deleteProperty);
router.put('/updateProperty/:id',updateProperty);





export default router;