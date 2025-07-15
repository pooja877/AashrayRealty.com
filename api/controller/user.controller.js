import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import cloudinary from "../cloudinary.js";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();




export const getUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.json({ id: req.user.id, email: req.user.email });
  // console.log(req.user.email);
};

// export const getUserdet = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     console.log(userId);
//     // Fetch full user details from DB
//     const user = await User.findById(userId).select('email username mobile avatar');

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

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
    const users = await User.find().sort({ createdAt: -1 }); // Fetch all properties
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

  
// export const deleteUser=async(req,res,next)=>{
//     if(req.user.id !== req.params.id)
//         {
//             return next(errorHandler(401,"You can only delete your own account!"));
//         }
//     try{
//         await User.findByIdAndDelete(req.params.id);
//         res.status(200).json('user has been delete');
//     }
//     catch(error)
//     {
//         next(error);
//     }
// }
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
      return next(errorHandler(401, "You can only delete your own account!"));
  }

  try {
      const user = await User.findById(req.params.id);
      if (!user) {
          return next(errorHandler(404, "User not found"));
      }

      // ✅ ये लाइन middleware को trigger करेगी
      await user.deleteOne(); 

      res.status(200).json("User and their properties have been deleted.");
  } catch (error) {
      next(error);
  }
};


export const getMobileNumber = async (req, res) => {
  try {
    const userId = req.user.id; // assuming user is authenticated
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      mobile: user.mobile,
      ismobileVerified: user.ismobileVerified, // ✅ Send this to frontend
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Debugging: Check if Twilio credentials are loaded correctly


const otpStore = {}; // Temporary store for OTPs

export const sendOTP = async (req, res) => {
  const { mobile } = req.body;
  // console.log("Received Mobile Number:", mobile);

  // Validate mobile number
  if (!mobile || !/^\d{10}$/.test(mobile)) {
    return res.status(400).json({ success: false, message: "Invalid mobile number" });
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[mobile] = otp;
//  console.log(otp);
  try {
    // Send OTP via Twilio
    const message = await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER, // Must be a verified Twilio number
      to: `+91${mobile}`,
    });

    // console.log("Twilio Response:", message);

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Twilio Error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP", error: error.message });
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


export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("User ID:", id);

    const user = await User.findById(id); // ✅ Correct usage
    // console.log("User:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
