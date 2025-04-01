import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';  
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import adminRouter from './routes/admin.route.js';
import cookieParser from 'cookie-parser';
import propertyRouter from './routes/property.route.js';
import newsRoutes from './routes/news.route.js';
import feedbackRoutes from './routes/feedback.route.js';
import reviewRoutes from './routes/review.route.js';
import likedRoutes from './routes/liked.route.js';
import contactRoutes from './routes/contact.route.js';
import bookRoutes from './routes/booking.route.js';
import rentingRoutes from './routes/renting.route.js';
import  notificationRoutes  from './routes/notification.route.js';
import cron from "node-cron";
import { sendExpiryReminders } from './controller/notification.controller.js';
import { sendRentPaymentReminder } from './controller/renting.controller.js';
import unPaidRoutes from './routes/unpaiduser.route.js';

dotenv.config();

mongoose
    .connect(process.env.MONGO)
    .then(()=>{
     console.log("Connect to MongoDB!!!");
})
    .catch((err)=>{
     console.log("Not Connect!!"+err);
});

const app=express();

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,  
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(express.json({limit:'50mb'}));


//app.use(express.urlencoded({extended:true,limit:'50mb'}));




app.listen(3000,()=>{
    console.log("server is run 3000!!!!");
});



    app.use('/api/user',userRouter);
     app.use('/api/auth', authRouter);
     app.use('/api/admin', adminRouter);
     app.use('/api/property',propertyRouter);
     app.use("/api/news", newsRoutes);
     app.use("/api/feedback",feedbackRoutes );
     app.use("/api/review",reviewRoutes );
     app.use("/api/likes",likedRoutes );
     app.use("/api/contact",contactRoutes );
     app.use("/api/book",bookRoutes );
     app.use("/api/notify", notificationRoutes);
     app.use("/api/rent",rentingRoutes);
     app.use("/api/unpaid",unPaidRoutes);

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
});
});

cron.schedule("0 9 * * *", () => {
// cron.schedule("*/3 * * * *", () => {

  console.log("Running expiry reminder check...");  
  sendRentPaymentReminder();
  sendExpiryReminders(); 
});
// sendRentPaymentReminder();