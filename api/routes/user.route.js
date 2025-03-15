import express from 'express';
import upload from "../multer.js";
import { deleteUser,  test, updateUser, uploadProfilePicture} from '../controller/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router=express.Router();

router.get('/test',test);

router.post('/update/:id',verifyToken,updateUser);

router.delete('/delete/:id',verifyToken,deleteUser);
router.post("/profileupload/:id",verifyToken,upload.single("image"),uploadProfilePicture);
export default router;