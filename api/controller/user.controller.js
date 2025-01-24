import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
export const test=(req,res)=>{
    res.json({
        message:"Api is work!!"
    });
}
export const updateUser=async (req,res,next) =>{

    if(req.user.id !== req.params.id)
    {
        return next(errorHandler(401,"You can only update your own account!"));
    }
    try{
        if(req.body.password)
        {
            req.body.password=bcryptjs.hashSync(req.body.password,10);
        }
        const updateUser=await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password
            }
        },{new:true});

        const {password,...rest}=updateUser._doc;
        res.status(200).json(rest);
    }
    catch(error)
    {
        next(error);
    }
}

export const deleteUser=async(req,res,next)=>{
    if(req.user.id !== req.params.id)
        {
            return next(errorHandler(401,"You can only delete your own account!"));
        }
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('user has been delete');
    }
    catch(error)
    {
        next(error);
    }
}


// export const password=async (req,res,next) =>{

//     if(req.body.password!== req.body.confirmPassword)
//            {
//             return res.status(400).json({error:'Password do not match !!'});
//            }
//     try{
//         if(req.body.password)
//         {
//             req.body.password=bcryptjs.hashSync(req.body.password,10);
//         }
//         const updatePassword=await User.findByIdAndUpdate(req.params.id,{
//             $set:{
//                 password:req.body.password
//             }
//         },{new:true});

//         const {password,...rest}=updatePassword._doc;
//         res.status(200).json(rest);
//     }
//     catch(error)
//     {
//         next(error);
//     }
// }



