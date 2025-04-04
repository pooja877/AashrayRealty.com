import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import cloudinary from "../cloudinary.js";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const otpStore = {}; 


export const getUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.json({ id: req.user.id, email: req.user.email });
  // console.log(req.user.email);
};


export const deleteusersadmin = async (req, res) => {
  try {
      const { id } = req.params;

      // Find and delete the property by ID
      const deleteduser = await User.findByIdAndDelete(id);

      if (!deleteduser) {
          return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
  }
};

export const allUsers= async (req, res) => {
  try {
    const users = await User.find(); // Fetch all properties
    res.status(200).json(users);
} catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
}
};

export const uploadProfilePicture = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded." });
    }

    // Upload Image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "profile_pictures/" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer); // Send buffer to Cloudinary
    });

   
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { avatar: result.secure_url } }, // Use $set to update only avatar
      { new: true }
    );
    console.log(updateUser);

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, avatar: result.secure_url, user: updatedUser });
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

export const getMobileNumber = async (req, res) => {
  try {
      const user = await User.findById(req.user.id);
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }
      res.json({ mobile: user.mobile });
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch mobile number" });
  }
};


export const sendOTP = async (req, res) => {
  const { mobile } = req.body;

  if (!mobile || !/^\d{10}$/.test(mobile)) {
    return res.status(400).json({ success: false, message: "Invalid mobile number" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[mobile] = otp;

  try {
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${mobile}`,
    });

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send OTP", error });
  }
};

// Verify OTP
export const verifyOTP = (req, res) => {
  const { mobile, otp } = req.body;

  if (otpStore[mobile] == otp) {
    delete otpStore[mobile]; // Remove OTP after verification
    res.json({ success: true, message: "OTP verified successfully" });
  } else {
    res.status(400).json({ success: false, message: "Invalid OTP" });
  }
};