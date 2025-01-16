import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connect to MonoDB");
})
.catch((err)=>{
    console.log("Not Connect!!"+err);
});

const app=express();
app.listen(3000,()=>{
    console.log("server is run!!");
})