import express from 'express';
import upload from "../multer.js";
import { allUsers,getUser, deleteUser, deleteusersadmin, test, updateUser, getMobileNumber, sendOTP, verifyOTP} from '../controller/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router=express.Router();

router.get('/test',test);

router.post('/update/:id',verifyToken,updateUser);

router.get("/me", verifyToken, getUser);
router.get("/getMobile", verifyToken, getMobileNumber);

router.get('/all',allUsers);
router.delete('/delete/:id',verifyToken,deleteUser);
router.delete('/deleteuser/:id',deleteusersadmin);

router.post("/sendotp", sendOTP);
router.post("/verify-otp", verifyOTP);
// router.post("/profileupload/:id",verifyToken,upload.single("image"),uploadProfilePicture);



export default router;