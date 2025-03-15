import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import cloudinary from "../cloudinary.js";

export const uploadProfilePicture = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Check if file exists
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No image uploaded." });
      }
  
      // Upload Image to Cloudinary
      const result = await cloudinary.v2.uploader.upload_stream(
        { folder: "profile_pictures" },
        async (error, cloudinaryResult) => {
          if (error) {
            return res.status(500).json({ success: false, message: "Cloudinary upload failed" });
          }
  
          // Update User Profile with Cloudinary URL
          const updatedUser = await User.findByIdAndUpdate(
            id,
            { avatar: cloudinaryResult.secure_url }, // Save URL in DB
            { new: true }
          );
  
          if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found." });
          }
  
          res.status(200).json(updatedUser);
        }
      );
  
      result.end(req.file.buffer); // Send the buffer to Cloudinary
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

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
                password:req.body.password,
                avatar:req.body.avatar
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
// export const updateUser = async (req, res) => {
//     try {
//       const { username, email } = req.body;
  
//       // Ensure data is provided
//       if (!username || !email) {
//         return res.status(400).json({ message: "Username and email are required." });
//       }
  
//       const updatedUser = await User.findByIdAndUpdate(
//         req.params.id,
//         { username, email },
//         { new: true }
//       );
  
//       if (!updatedUser) {
//         return res.status(404).json({ message: "User not found." });
//       }
  
//       res.json(updatedUser);
//     } catch (error) {
//       console.error("Update Error:", error);
//       res.status(500).json({ message: "Internal server error." });
//     }
//   };
  
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

