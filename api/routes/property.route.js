import express from 'express';
import { addProperty } from '../controller/property.controller.js';
const router=express.Router();

router.post('/add',addProperty);
export default router;