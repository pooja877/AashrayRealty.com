import express from 'express';
import { forgetPassword, google,logout,reset,signin,signup,verifyEmail} from '../controller/auth.controller.js';

const router=express.Router();

router.get('/verify/:token', verifyEmail);

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google',google);
router.post('/forgetPassword',forgetPassword);
router.post('/reset',reset);

router.get('/logout',logout);
export default router;