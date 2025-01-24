import express from 'express';
import { forgetPassword, google,logout,resetPassword,signin,signup} from '../controller/auth.controller.js';

const router=express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google',google);
router.post('/forgetPassword',forgetPassword);
router.post('/resetPassword',resetPassword);
router.get('/logout',logout);
export default router;