import express from 'express';


const userRouter=express.Router();

userRouter.get('/test',(req,res)=>{
    res.json({
        message:"Hello!!"
    })
})
export default userRouter;